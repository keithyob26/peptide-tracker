export interface Compound {
  name: string;
  category: "peptide" | "mens_hrt" | "womens_hrt";
  typicalCycleDays: number;
  researchContext: string;
  commonDoses: string[];
}

export const compounds: Compound[] = [
  // PEPTIDES
  { name: "BPC-157", category: "peptide", typicalCycleDays: 84, researchContext: "Body protective compound studied for tissue repair and gut healing.", commonDoses: ["250mcg", "500mcg"] },
  { name: "TB-500", category: "peptide", typicalCycleDays: 84, researchContext: "Thymosin Beta-4 fragment studied for muscle, tendon, and ligament repair.", commonDoses: ["2.5mg", "5mg"] },
  { name: "GHK-Cu", category: "peptide", typicalCycleDays: 60, researchContext: "Copper peptide studied for skin regeneration and anti-aging effects.", commonDoses: ["1mg", "2mg"] },
  { name: "Ipamorelin", category: "peptide", typicalCycleDays: 90, researchContext: "Selective growth hormone secretagogue studied for GH pulse stimulation.", commonDoses: ["200mcg", "300mcg"] },
  { name: "CJC-1295", category: "peptide", typicalCycleDays: 90, researchContext: "GHRH analogue studied for sustained growth hormone release.", commonDoses: ["100mcg", "200mcg"] },
  { name: "GHRP-6", category: "peptide", typicalCycleDays: 90, researchContext: "Growth hormone releasing peptide studied for GH secretion and appetite.", commonDoses: ["100mcg", "200mcg"] },
  { name: "Semax", category: "peptide", typicalCycleDays: 30, researchContext: "Nootropic peptide studied for cognitive enhancement and neuroprotection.", commonDoses: ["300mcg", "600mcg"] },
  { name: "Selank", category: "peptide", typicalCycleDays: 30, researchContext: "Anxiolytic peptide studied for stress reduction and mood regulation.", commonDoses: ["250mcg", "500mcg"] },
  { name: "Epithalon", category: "peptide", typicalCycleDays: 20, researchContext: "Tetrapeptide studied for telomere lengthening and longevity.", commonDoses: ["5mg", "10mg"] },
  { name: "PT-141", category: "peptide", typicalCycleDays: 30, researchContext: "Melanocortin peptide studied for sexual function and libido.", commonDoses: ["1mg", "2mg"] },
  { name: "Retatrutide", category: "peptide", typicalCycleDays: 90, researchContext: "Triple agonist (GLP-1/GIP/glucagon) studied for metabolic and weight outcomes.", commonDoses: ["2mg", "4mg", "8mg"] },
  { name: "Tirzepatide", category: "peptide", typicalCycleDays: 90, researchContext: "Dual GLP-1/GIP agonist studied for type 2 diabetes and weight management.", commonDoses: ["5mg", "10mg", "15mg"] },
  { name: "Semaglutide", category: "peptide", typicalCycleDays: 90, researchContext: "GLP-1 receptor agonist studied for blood sugar control and weight reduction.", commonDoses: ["0.25mg", "0.5mg", "1mg"] },
  { name: "MOTS-c", category: "peptide", typicalCycleDays: 60, researchContext: "Mitochondrial peptide studied for metabolic regulation and insulin sensitivity.", commonDoses: ["5mg", "10mg"] },
  { name: "IGF-1 LR3", category: "peptide", typicalCycleDays: 30, researchContext: "Long-acting IGF-1 analogue studied for muscle growth and repair.", commonDoses: ["50mcg", "100mcg"] },
  // MEN'S HRT
  { name: "Testosterone Enanthate", category: "mens_hrt", typicalCycleDays: 84, researchContext: "Long-acting testosterone ester used in TRT for hypogonadism.", commonDoses: ["100mg", "200mg", "250mg"] },
  { name: "Testosterone Cypionate", category: "mens_hrt", typicalCycleDays: 84, researchContext: "Long-acting testosterone ester commonly used in US TRT protocols.", commonDoses: ["100mg", "200mg"] },
  { name: "Testosterone Propionate", category: "mens_hrt", typicalCycleDays: 56, researchContext: "Short-acting testosterone ester requiring more frequent dosing.", commonDoses: ["50mg", "100mg"] },
  { name: "HCG", category: "mens_hrt", typicalCycleDays: 90, researchContext: "Human chorionic gonadotropin used to maintain testicular function on TRT.", commonDoses: ["500IU", "1000IU"] },
  { name: "Anastrozole", category: "mens_hrt", typicalCycleDays: 84, researchContext: "Aromatase inhibitor used to manage estrogen levels during TRT.", commonDoses: ["0.25mg", "0.5mg", "1mg"] },
  { name: "Exemestane", category: "mens_hrt", typicalCycleDays: 84, researchContext: "Steroidal aromatase inhibitor used for estrogen control in HRT.", commonDoses: ["12.5mg", "25mg"] },
  { name: "DHEA", category: "mens_hrt", typicalCycleDays: 90, researchContext: "Adrenal precursor hormone studied for energy, libido, and longevity.", commonDoses: ["25mg", "50mg"] },
  { name: "Pregnenolone", category: "mens_hrt", typicalCycleDays: 90, researchContext: "Master neurosteroid studied for cognition, memory, and hormonal balance.", commonDoses: ["25mg", "50mg", "100mg"] },
  { name: "Enclomiphene", category: "mens_hrt", typicalCycleDays: 90, researchContext: "Selective estrogen receptor modulator studied to raise LH/FSH and testosterone.", commonDoses: ["12.5mg", "25mg"] },
  // WOMEN'S HRT
  { name: "Estradiol Valerate", category: "womens_hrt", typicalCycleDays: 90, researchContext: "Estrogen ester used in women's HRT for menopausal symptom relief.", commonDoses: ["1mg", "2mg", "4mg"] },
  { name: "Estradiol Patch", category: "womens_hrt", typicalCycleDays: 90, researchContext: "Transdermal estradiol delivery for consistent hormone replacement.", commonDoses: ["25mcg", "50mcg", "100mcg"] },
  { name: "Progesterone", category: "womens_hrt", typicalCycleDays: 90, researchContext: "Bioidentical progesterone used in HRT to balance estrogen and support sleep.", commonDoses: ["100mg", "200mg"] },
  { name: "DHEA (Women)", category: "womens_hrt", typicalCycleDays: 90, researchContext: "Lower-dose DHEA studied for energy, libido, and well-being in women.", commonDoses: ["10mg", "25mg"] },
  { name: "Tibolone", category: "womens_hrt", typicalCycleDays: 90, researchContext: "Synthetic steroid with estrogenic, progestogenic, and androgenic activity.", commonDoses: ["1.25mg", "2.5mg"] },
  { name: "Thyroid (T3/T4)", category: "womens_hrt", typicalCycleDays: 365, researchContext: "Thyroid hormone replacement studied for metabolic regulation and energy.", commonDoses: ["25mcg T4", "50mcg T4", "5mcg T3"] },
  { name: "Testosterone (low dose female)", category: "womens_hrt", typicalCycleDays: 90, researchContext: "Low-dose testosterone studied for libido, energy, and body composition in women.", commonDoses: ["5mg", "10mg"] },
];

export const getCategoryLabel = (category: string): string => {
  switch (category) {
    case "peptide": return "Peptides";
    case "mens_hrt": return "Men's HRT";
    case "womens_hrt": return "Women's HRT";
    default: return category;
  }
};
