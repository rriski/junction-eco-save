export type Property = {
  address: string;
  postalCode: string;
  city: string;
  built: number;
  ecosave: number;
  lastRenovation: string;
}

export type KPI = {
  indicator: number;
  category: string;
  kpi: number | string;
}