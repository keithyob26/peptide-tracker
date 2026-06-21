export interface Compound {
  name: string;
  category: "peptide" | "mens_hrt" | "womens_hrt" | "sarm" | "stack";
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
  { name: "Retatrutide", category: "peptide", typicalCycleDays: 90, researchContext: "Triple agonist (GLP-1/GIP/glucagon) studied for metabolic and weight outcomes.", commonDoses: ["2mg", "4mg", "8mg"] },
  { name: "Tirzepatide", category: "peptide", typicalCycleDays: 90, researchContext: "Dual GLP-1/GIP agonist studied for type 2 diabetes and weight management.", commonDoses: ["5mg", "10mg", "15mg"] },
  { name: "Semaglutide", category: "peptide", typicalCycleDays: 90, researchContext: "GLP-1 receptor agonist studied for blood sugar control and weight reduction.", commonDoses: ["0.25mg", "0.5mg", "1mg"] },
  { name: "MOTS-c", category: "peptide", typicalCycleDays: 60, researchContext: "Mitochondrial peptide studied for metabolic regulation and insulin sensitivity.", commonDoses: ["5mg", "10mg"] },
  { name: "IGF-1 LR3", category: "peptide", typicalCycleDays: 30, researchContext: "Long-acting IGF-1 analogue studied for muscle growth and repair.", commonDoses: ["50mcg", "100mcg"] },
  { name: "GHRP-2", category: "peptide", typicalCycleDays: 90, researchContext: "Growth hormone releasing peptide-2 studied for GH secretion and appetite stimulation.", commonDoses: ["100mcg", "200mcg", "300mcg"] },
  { name: "Tesamorelin", category: "peptide", typicalCycleDays: 90, researchContext: "GHRH analogue studied for visceral fat reduction and GH secretion.", commonDoses: ["1mg", "2mg"] },
  { name: "Sermorelin", category: "peptide", typicalCycleDays: 90, researchContext: "GHRH analogue studied for natural growth hormone stimulation and anti-aging.", commonDoses: ["200mcg", "300mcg", "500mcg"] },
  { name: "Hexarelin", category: "peptide", typicalCycleDays: 60, researchContext: "Potent GHRP studied for GH secretion and cardiac protection.", commonDoses: ["100mcg", "200mcg"] },
  { name: "GRF (Mod GRF 1-29)", category: "peptide", typicalCycleDays: 90, researchContext: "Modified GHRH fragment studied for sustained GH release with improved stability.", commonDoses: ["100mcg", "200mcg"] },
  { name: "Gonadorelin", category: "peptide", typicalCycleDays: 90, researchContext: "GnRH analogue studied for LH/FSH stimulation and fertility support.", commonDoses: ["100mcg", "250mcg"] },
  { name: "PT-141 (Bremelanotide)", category: "peptide", typicalCycleDays: 30, researchContext: "Melanocortin receptor agonist studied for sexual dysfunction and libido.", commonDoses: ["1mg", "2mg"] },
  { name: "Thymosin Alpha-1", category: "peptide", typicalCycleDays: 30, researchContext: "Immune-modulating peptide studied for T-cell function and antiviral response.", commonDoses: ["1.6mg", "3.2mg"] },
  { name: "Thymosin Beta-4 (TB-4)", category: "peptide", typicalCycleDays: 84, researchContext: "Actin-sequestering protein studied for tissue repair, inflammation, and wound healing.", commonDoses: ["2.5mg", "5mg"] },
  { name: "KPV", category: "peptide", typicalCycleDays: 30, researchContext: "Alpha-MSH tripeptide fragment studied for anti-inflammatory and gut healing effects.", commonDoses: ["500mcg", "1mg"] },
  { name: "Larazotide", category: "peptide", typicalCycleDays: 60, researchContext: "Tight junction regulator studied for intestinal permeability and coeliac disease.", commonDoses: ["0.5mg", "1mg"] },
  { name: "Adipotide", category: "peptide", typicalCycleDays: 28, researchContext: "Proapoptotic peptide studied for targeted fat cell destruction and obesity.", commonDoses: ["100mcg", "250mcg"] },
  { name: "Follistatin 344", category: "peptide", typicalCycleDays: 30, researchContext: "Myostatin inhibitor studied for muscle growth and fat reduction.", commonDoses: ["100mcg", "200mcg"] },
  { name: "Pinealon", category: "peptide", typicalCycleDays: 20, researchContext: "Pineal gland tripeptide studied for neuroprotection and sleep regulation.", commonDoses: ["1mg", "2mg"] },
  { name: "Oxytocin", category: "peptide", typicalCycleDays: 30, researchContext: "Neuropeptide studied for social bonding, stress reduction, and recovery.", commonDoses: ["10IU", "20IU"] },
  { name: "DSIP", category: "peptide", typicalCycleDays: 14, researchContext: "Delta sleep-inducing peptide studied for sleep quality and stress resilience.", commonDoses: ["100mcg", "200mcg"] },
  { name: "SS-31 (Elamipretide)", category: "peptide", typicalCycleDays: 30, researchContext: "Mitochondria-targeting peptide studied for energy production and cardioprotection.", commonDoses: ["1mg", "2mg"] },
  { name: "Rapamycin", category: "peptide", typicalCycleDays: 365, researchContext: "mTOR inhibitor studied for longevity, autophagy, and immune modulation.", commonDoses: ["1mg", "2mg", "5mg"] },
  { name: "Insulin (research)", category: "peptide", typicalCycleDays: 30, researchContext: "Anabolic hormone studied for nutrient partitioning and muscle recovery in research contexts.", commonDoses: ["2IU", "4IU"] },
  { name: "Collagen Peptides", category: "peptide", typicalCycleDays: 90, researchContext: "Hydrolysed collagen studied for joint, skin, and connective tissue support.", commonDoses: ["5g", "10g", "15g"] },
  { name: "Creatine Peptide", category: "peptide", typicalCycleDays: 90, researchContext: "Peptide-bonded creatine studied for improved absorption vs. monohydrate.", commonDoses: ["3g", "5g"] },
  { name: "Abaloparatide", category: "peptide", typicalCycleDays: 90, researchContext: "PTHrP analogue studied for bone density and osteoporosis treatment.", commonDoses: ["80mcg"] },
  { name: "Teriparatide", category: "peptide", typicalCycleDays: 730, researchContext: "PTH(1-34) analogue studied for bone formation and osteoporosis.", commonDoses: ["20mcg"] },
  { name: "Kisspeptin", category: "peptide", typicalCycleDays: 14, researchContext: "Hypothalamic neuropeptide studied for LH/FSH stimulation, fertility, and libido enhancement.", commonDoses: ["100mcg", "500mcg", "1mg"] },
  { name: "FOXO4-DRI", category: "peptide", typicalCycleDays: 28, researchContext: "Senolytic peptide studied for selective elimination of senescent cells and longevity.", commonDoses: ["1mg", "2mg", "5mg"] },
  { name: "SNAP-8 (Acetyl Octapeptide-3)", category: "peptide", typicalCycleDays: 56, researchContext: "Neurocosmetic octapeptide studied for wrinkle reduction by inhibiting muscle contraction signals.", commonDoses: ["0.5mg", "1mg"] },
  { name: "NAD+", category: "peptide", typicalCycleDays: 90, researchContext: "Essential coenzyme studied for mitochondrial energy, DNA repair, and longevity signalling.", commonDoses: ["250mg", "500mg", "1000mg"] },
  { name: "LIPO-D", category: "peptide", typicalCycleDays: 30, researchContext: "Lipotropic blend (typically MIC + B12 + D3) studied for fat metabolism and energy support.", commonDoses: ["0.5ml", "1ml"] },
  { name: "B12 (Methylcobalamin)", category: "peptide", typicalCycleDays: 90, researchContext: "Active B12 form studied for neurological function, energy metabolism, and red blood cell production.", commonDoses: ["500mcg", "1mg", "5mg"] },
  { name: "AHK-Cu", category: "peptide", typicalCycleDays: 60, researchContext: "Alanine-Histidine-Lysine copper peptide studied for hair follicle stimulation and scalp health.", commonDoses: ["500mcg", "1mg"] },
  // STACKS
  { name: "Wolverine Stack (BPC-157 + TB-500 + GHK-Cu + KPV)", category: "stack", typicalCycleDays: 84, researchContext: "Injury recovery stack combining gut/tissue repair (BPC-157), systemic healing (TB-500), skin regen (GHK-Cu), and anti-inflammation (KPV).", commonDoses: ["BPC-157 250mcg + TB-500 2.5mg + GHK-Cu 1mg + KPV 500mcg"] },
  { name: "KLOW (Glow) Stack (GHK-Cu + KPV + BPC-157 + TB-500)", category: "stack", typicalCycleDays: 60, researchContext: "Skin and gut health stack combining collagen stimulation (GHK-Cu), gut lining repair (KPV + BPC-157), and anti-inflammatory healing (TB-500).", commonDoses: ["GHK-Cu 1mg + KPV 500mcg + BPC-157 250mcg + TB-500 2.5mg"] },
  // SARMs
  { name: "Ostarine (MK-2866)", category: "sarm", typicalCycleDays: 60, researchContext: "First-gen SARM studied for muscle preservation and bone density. Mildest profile.", commonDoses: ["10mg", "15mg", "25mg"] },
  { name: "Ligandrol (LGD-4033)", category: "sarm", typicalCycleDays: 42, researchContext: "Potent SARM studied for lean muscle gain and strength. Significant testosterone suppression.", commonDoses: ["5mg", "10mg"] },
  { name: "Andarine (S-4)", category: "sarm", typicalCycleDays: 56, researchContext: "SARM studied for fat loss and muscle hardening. Vision side effects at high dose.", commonDoses: ["25mg", "50mg"] },
  { name: "S-23", category: "sarm", typicalCycleDays: 42, researchContext: "Highly potent SARM studied for muscle density and fat loss. Strong suppression.", commonDoses: ["10mg", "20mg"] },
  { name: "S-40503", category: "sarm", typicalCycleDays: 42, researchContext: "Bone-selective SARM studied for osteoporosis with reduced androgenic activity.", commonDoses: ["3mg", "6mg"] },
  { name: "Vosilasarm (RAD-140)", category: "sarm", typicalCycleDays: 56, researchContext: "Selective androgen receptor modulator studied for muscle gain and neuroprotection.", commonDoses: ["10mg", "15mg", "20mg"] },
  { name: "YK-11", category: "sarm", typicalCycleDays: 42, researchContext: "Myostatin inhibitor and partial AR agonist studied for extreme muscle growth.", commonDoses: ["5mg", "10mg"] },
  { name: "GSK-2881078", category: "sarm", typicalCycleDays: 42, researchContext: "Clinical-stage SARM studied for muscle wasting and cachexia treatment.", commonDoses: ["1mg", "2mg"] },
  { name: "LGD-3303", category: "sarm", typicalCycleDays: 42, researchContext: "Orally active SARM studied for bone and muscle anabolic effects.", commonDoses: ["10mg", "20mg"] },
  { name: "LGD-3033", category: "sarm", typicalCycleDays: 42, researchContext: "Partial AR agonist studied for dry muscle gains with minimal water retention.", commonDoses: ["10mg", "15mg"] },
  { name: "TT-701", category: "sarm", typicalCycleDays: 42, researchContext: "Tissue-selective SARM studied for anabolic effects in muscle and bone.", commonDoses: ["10mg", "20mg"] },
  { name: "RAD150 (TLB-150)", category: "sarm", typicalCycleDays: 56, researchContext: "Esterified RAD-140 analogue studied for longer half-life and sustained anabolic activity.", commonDoses: ["10mg", "20mg"] },
  { name: "ACP-105", category: "sarm", typicalCycleDays: 42, researchContext: "Non-steroidal SARM studied for muscle and bone anabolism with CNS benefits.", commonDoses: ["5mg", "11mg"] },
  { name: "MK-677 (Ibutamoren)", category: "sarm", typicalCycleDays: 90, researchContext: "GH secretagogue (non-SARM class but SARM-stack staple) studied for GH/IGF-1 elevation.", commonDoses: ["12.5mg", "25mg"] },
  { name: "GW501516 (Cardarine)", category: "sarm", typicalCycleDays: 42, researchContext: "PPARδ agonist (not a SARM) studied for endurance and fat oxidation.", commonDoses: ["10mg", "20mg"] },
  { name: "SR-9009 (Stenabolic)", category: "sarm", typicalCycleDays: 42, researchContext: "Rev-ErbA agonist studied for metabolism, endurance, and circadian rhythm regulation.", commonDoses: ["20mg", "30mg"] },
  { name: "SR-9011", category: "sarm", typicalCycleDays: 42, researchContext: "More potent Rev-ErbA agonist than SR-9009, studied for metabolic and endurance effects.", commonDoses: ["20mg", "30mg"] },
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
    case "sarm": return "SARMs";
    case "stack": return "Stacks";
    default: return category;
  }
};
