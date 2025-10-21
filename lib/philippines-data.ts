export interface Municipality {
  name: string;
  code: string;
}

export interface Region {
  name: string;
  code: string;
  municipalities: Municipality[];
}

export const PHILIPPINES_REGIONS: Region[] = [
  {
    name: "National Capital Region (NCR)",
    code: "NCR",
    municipalities: [
      { name: "Caloocan", code: "CAL" },
      { name: "Las Piñas", code: "LPI" },
      { name: "Makati", code: "MKT" },
      { name: "Malabon", code: "MAL" },
      { name: "Mandaluyong", code: "MND" },
      { name: "Manila", code: "MNL" },
      { name: "Marikina", code: "MRK" },
      { name: "Muntinlupa", code: "MUN" },
      { name: "Navotas", code: "NAV" },
      { name: "Parañaque", code: "PAR" },
      { name: "Pasay", code: "PAS" },
      { name: "Pasig", code: "PSG" },
      { name: "Pateros", code: "PAT" },
      { name: "Quezon City", code: "QC" },
      { name: "San Juan", code: "SJU" },
      { name: "Taguig", code: "TAG" },
      { name: "Valenzuela", code: "VAL" },
    ],
  },
  {
    name: "Cordillera Administrative Region (CAR)",
    code: "CAR",
    municipalities: [
      { name: "Baguio City", code: "BAG" },
      { name: "Abra", code: "ABR" },
      { name: "Apayao", code: "APA" },
      { name: "Benguet", code: "BEN" },
      { name: "Ifugao", code: "IFU" },
      { name: "Kalinga", code: "KAL" },
      { name: "Mountain Province", code: "MOU" },
    ],
  },
  {
    name: "Ilocos Region (Region I)",
    code: "01",
    municipalities: [
      { name: "Ilocos Norte", code: "ILN" },
      { name: "Ilocos Sur", code: "ILS" },
      { name: "La Union", code: "LAU" },
      { name: "Pangasinan", code: "PAN" },
    ],
  },
  {
    name: "Cagayan Valley (Region II)",
    code: "02",
    municipalities: [
      { name: "Batanes", code: "BTN" },
      { name: "Cagayan", code: "CAG" },
      { name: "Isabela", code: "ISA" },
      { name: "Nueva Vizcaya", code: "NUV" },
      { name: "Quirino", code: "QUI" },
    ],
  },
  {
    name: "Central Luzon (Region III)",
    code: "03",
    municipalities: [
      { name: "Aurora", code: "AUR" },
      { name: "Bataan", code: "BAN" },
      { name: "Bulacan", code: "BUL" },
      { name: "Nueva Ecija", code: "NUE" },
      { name: "Pampanga", code: "PAM" },
      { name: "Tarlac", code: "TAR" },
      { name: "Zambales", code: "ZAM" },
    ],
  },
  {
    name: "CALABARZON (Region IV-A)",
    code: "04A",
    municipalities: [
      { name: "Batangas", code: "BTG" },
      { name: "Cavite", code: "CAV" },
      { name: "Laguna", code: "LAG" },
      { name: "Quezon", code: "QUE" },
      { name: "Rizal", code: "RIZ" },
    ],
  },
  {
    name: "MIMAROPA (Region IV-B)",
    code: "04B",
    municipalities: [
      { name: "Marinduque", code: "MAD" },
      { name: "Occidental Mindoro", code: "MDC" },
      { name: "Oriental Mindoro", code: "MDR" },
      { name: "Palawan", code: "PLW" },
      { name: "Romblon", code: "ROM" },
    ],
  },
  {
    name: "Bicol Region (Region V)",
    code: "05",
    municipalities: [
      { name: "Albay", code: "ALB" },
      { name: "Camarines Norte", code: "CAN" },
      { name: "Camarines Sur", code: "CAS" },
      { name: "Catanduanes", code: "CAT" },
      { name: "Masbate", code: "MAS" },
      { name: "Sorsogon", code: "SOR" },
    ],
  },
  {
    name: "Western Visayas (Region VI)",
    code: "06",
    municipalities: [
      { name: "Aklan", code: "AKL" },
      { name: "Antique", code: "ANT" },
      { name: "Capiz", code: "CAP" },
      { name: "Guimaras", code: "GUI" },
      { name: "Iloilo", code: "ILI" },
      { name: "Negros Occidental", code: "NEC" },
    ],
  },
  {
    name: "Central Visayas (Region VII)",
    code: "07",
    municipalities: [
      { name: "Bohol", code: "BOH" },
      { name: "Cebu", code: "CEB" },
      { name: "Negros Oriental", code: "NER" },
      { name: "Siquijor", code: "SIG" },
    ],
  },
  {
    name: "Eastern Visayas (Region VIII)",
    code: "08",
    municipalities: [
      { name: "Biliran", code: "BIL" },
      { name: "Eastern Samar", code: "EAS" },
      { name: "Leyte", code: "LEY" },
      { name: "Northern Samar", code: "NSA" },
      { name: "Samar", code: "WSA" },
      { name: "Southern Leyte", code: "SLE" },
    ],
  },
  {
    name: "Zamboanga Peninsula (Region IX)",
    code: "09",
    municipalities: [
      { name: "Zamboanga del Norte", code: "ZAN" },
      { name: "Zamboanga del Sur", code: "ZAS" },
      { name: "Zamboanga Sibugay", code: "ZSI" },
    ],
  },
  {
    name: "Northern Mindanao (Region X)",
    code: "10",
    municipalities: [
      { name: "Bukidnon", code: "BUK" },
      { name: "Camiguin", code: "CAM" },
      { name: "Lanao del Norte", code: "LAN" },
      { name: "Misamis Occidental", code: "MSC" },
      { name: "Misamis Oriental", code: "MSR" },
    ],
  },
  {
    name: "Davao Region (Region XI)",
    code: "11",
    municipalities: [
      { name: "Davao de Oro", code: "COM" },
      { name: "Davao del Norte", code: "DAV" },
      { name: "Davao del Sur", code: "DAS" },
      { name: "Davao Occidental", code: "DVO" },
      { name: "Davao Oriental", code: "DAO" },
    ],
  },
  {
    name: "SOCCSKSARGEN (Region XII)",
    code: "12",
    municipalities: [
      { name: "Cotabato", code: "NCO" },
      { name: "Sarangani", code: "SAR" },
      { name: "South Cotabato", code: "SCO" },
      { name: "Sultan Kudarat", code: "SUK" },
    ],
  },
  {
    name: "Caraga (Region XIII)",
    code: "13",
    municipalities: [
      { name: "Agusan del Norte", code: "AGN" },
      { name: "Agusan del Sur", code: "AGS" },
      { name: "Dinagat Islands", code: "DIN" },
      { name: "Surigao del Norte", code: "SUN" },
      { name: "Surigao del Sur", code: "SUR" },
    ],
  },
  {
    name: "Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)",
    code: "BARMM",
    municipalities: [
      { name: "Basilan", code: "BAS" },
      { name: "Lanao del Sur", code: "LAS" },
      { name: "Maguindanao", code: "MAG" },
      { name: "Sulu", code: "SLU" },
      { name: "Tawi-Tawi", code: "TAW" },
    ],
  },
];

export const getMunicipalitiesByRegion = (
  regionName: string
): Municipality[] => {
  const region = PHILIPPINES_REGIONS.find((r) => r.name === regionName);
  return region ? region.municipalities : [];
};

export const getAllRegions = (): Region[] => {
  return PHILIPPINES_REGIONS;
};
