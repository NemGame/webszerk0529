export interface Refueling {
  id: string;
  date: string;
  fuelAmount: number;
  paidAmount: number;
  odometer: number;
}

export interface RefuelingStats {
  original: Refueling;
  distanceDriven: number | null; // null for the first refueling
  fuelConsumed: number | null; // null for the first refueling, otherwise it's the fuelAmount of THIS refueling
  efficiency: number | null; // L/100km, null for the first
}
