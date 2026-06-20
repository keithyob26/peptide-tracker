"use client";
import { useState, useEffect, useRef } from "react";

interface Photo {
  id: string;
  data: string;
  date: string;
  note: string;
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [expandedPhoto, setExpandedPhoto] = useState<Photo | null>(null);
  const [compareA, setCompareA] = useState<string>("");
  const [compareB, setCompareB] = useState<string>("");
  const [showCompare, setShowCompare] = useState(false);
  const [note, setNote] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const raw = localStorage.getItem("pt_photos");
    if (raw) setPhotos(JSON.parse(raw));
  }, []);

  const savePhotos = (updated: Photo[]) => {
    setPhotos(updated);
    localStorage.setItem("pt_photos", JSON.stringify(updated));
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxW = 800;
          let w = img.width, h = img.height;
          if (w > maxW) { h = (h * maxW) / w; w = maxW; }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", 0.8));
        };
        img.src = e.target!.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const compressed = await compressImage(file);
    const photo: Photo = {
      id: Date.now().toString(),
      data: compressed,
      date: new Date().toISOString().split("T")[0],
      note,
    };
    savePhotos([photo, ...photos]);
    setNote("");
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const deletePhoto = (id: string) => {
    savePhotos(photos.filter((p) => p.id !== id));
    if (expandedPhoto?.id === id) setExpandedPhoto(null);
  };

  return (
    <div className="page">
      <h1 className="section-title">Progress Photos</h1>

      {/* Upload Section */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: "#14B8A6" }}>📷 Add Photo</div>
        <label className="label">Note (optional)</label>
        <input className="input" placeholder="e.g. Week 4, front view" value={note} onChange={(e) => setNote(e.target.value)} style={{ marginBottom: 12 }} />
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} id="photo-upload" />
        <label htmlFor="photo-upload">
          <div className="btn-primary" style={{ cursor: "pointer" }}>
            {uploading ? "Processing..." : "📷 Choose Photo"}
          </div>
        </label>
        <div style={{ fontSize: 12, color: "#64748B", marginTop: 10, textAlign: "center" }}>
          Photos compressed &amp; stored on your device only.{" "}
          <span style={{ color: "#14B8A6" }}>Supabase cloud sync coming soon.</span>
        </div>
      </div>

      {/* Compare Mode */}
      {photos.length >= 2 && (
        <div className="card" style={{ marginBottom: 20 }}>
          <button
            onClick={() => setShowCompare(!showCompare)}
            style={{ background: "transparent", border: "none", color: "#14B8A6", fontSize: 15, fontWeight: 600, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 6 }}
          >
            {showCompare ? "▼" : "▶"} Side-by-Side Comparison
          </button>
          {showCompare && (
            <div style={{ marginTop: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                <div>
                  <label className="label">Photo A</label>
                  <select className="input" value={compareA} onChange={(e) => setCompareA(e.target.value)}>
                    <option value="">Select...</option>
                    {photos.map((p) => <option key={p.id} value={p.id}>{p.date} {p.note ? `— ${p.note}` : ""}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Photo B</label>
                  <select className="input" value={compareB} onChange={(e) => setCompareB(e.target.value)}>
                    <option value="">Select...</option>
                    {photos.map((p) => <option key={p.id} value={p.id}>{p.date} {p.note ? `— ${p.note}` : ""}</option>)}
                  </select>
                </div>
              </div>
              {compareA && compareB && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[compareA, compareB].map((id, i) => {
                    const p = photos.find((ph) => ph.id === id);
                    return p ? (
                      <div key={id}>
                        <img src={p.data} alt="" style={{ width: "100%", borderRadius: 8, aspectRatio: "3/4", objectFit: "cover" }} />
                        <div style={{ fontSize: 11, color: "#64748B", marginTop: 4, textAlign: "center" }}>{i === 0 ? "Before" : "After"}: {p.date}</div>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Photo Grid */}
      {photos.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {photos.map((photo) => (
            <div key={photo.id} style={{ position: "relative" }}>
              <div
                onClick={() => setExpandedPhoto(photo)}
                style={{ cursor: "pointer", borderRadius: 10, overflow: "hidden", aspectRatio: "3/4", background: "#1C1C1C" }}
              >
                <img src={photo.data} alt={photo.note} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ fontSize: 11, color: "#64748B", marginTop: 4 }}>{photo.date}</div>
              {photo.note && <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}>{photo.note}</div>}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#64748B" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📷</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#94A3B8", marginBottom: 8 }}>No photos yet</div>
          <div style={{ fontSize: 14 }}>Add your first progress photo to start tracking your transformation.</div>
        </div>
      )}

      {/* Expanded Photo Modal */}
      {expandedPhoto && (
        <div
          onClick={() => setExpandedPhoto(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}
        >
          <img src={expandedPhoto.data} alt={expandedPhoto.note} style={{ maxWidth: "100%", maxHeight: "70vh", borderRadius: 12, objectFit: "contain" }} />
          <div style={{ color: "#F1F5F9", marginTop: 12, fontSize: 16, fontWeight: 600 }}>{expandedPhoto.note || expandedPhoto.date}</div>
          <div style={{ color: "#64748B", fontSize: 13, marginTop: 4 }}>{expandedPhoto.date}</div>
          <button
            onClick={(e) => { e.stopPropagation(); deletePhoto(expandedPhoto.id); }}
            style={{ marginTop: 16, background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.3)", color: "#EF4444", padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            Delete Photo
          </button>
          <div style={{ color: "#64748B", fontSize: 12, marginTop: 8 }}>Tap anywhere to close</div>
        </div>
      )}
    </div>
  );
}
