import { Refueling, RefuelingStats } from './types';

export const calculateStats = (refuelings: Refueling[]): RefuelingStats[] => {
  // Sort chronologically (oldest first) to ensure correct calculations
  const sorted = [...refuelings].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return sorted.map((refueling, index) => {
    if (index === 0) {
      return {
        original: refueling,
        distanceDriven: null,
        fuelConsumed: null,
        efficiency: null
      };
    }
    
    const prev = sorted[index - 1];
    const distanceDriven = refueling.odometer - prev.odometer;
    const fuelConsumed = refueling.fuelAmount;
    
    // Efficiency: liters per 100km
    let efficiency = null;
    if (distanceDriven > 0) {
      efficiency = (fuelConsumed / distanceDriven) * 100;
    }
    
    return {
      original: refueling,
      distanceDriven,
      fuelConsumed,
      efficiency
    };
  });
};

export const getMonthlySpending = (refuelings: Refueling[]): Record<string, number> => {
  const spending: Record<string, number> = {};
  
  refuelings.forEach(r => {
    // Extract YYYY-MM
    const dateObj = new Date(r.date);
    const month = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
    
    if (!spending[month]) {
      spending[month] = 0;
    }
    spending[month] += r.paidAmount;
  });
  
  return spending;
};
