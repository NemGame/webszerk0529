import { useState, useMemo } from 'react';
import { RefuelingForm } from './components/RefuelingForm';
import { MonthlySpending } from './components/MonthlySpending';
import { RefuelingList } from './components/RefuelingList';
import { calculateStats } from './utils';
import { Refueling } from './types';
import './index.css';

function App() {
  const [refuelings, setRefuelings] = useState<Refueling[]>([
    // Dummy Data to start with
    {
      id: '1',
      date: '2023-01-10',
      fuelAmount: 40.5,
      paidAmount: 23500,
      odometer: 105000,
    },
    {
      id: '2',
      date: '2023-01-25',
      fuelAmount: 38.0,
      paidAmount: 22000,
      odometer: 105650, // 650 km, 38L => 5.84 L/100km
    },
    {
      id: '3',
      date: '2023-02-12',
      fuelAmount: 42.1,
      paidAmount: 24500,
      odometer: 106300, // 650 km, 42.1L => 6.47 L/100km
    }
  ]);

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleAddRefueling = (data: Omit<Refueling, 'id'>) => {
    const newRefueling: Refueling = {
      ...data,
      id: Math.random().toString(36).substring(2, 9)
    };
    setRefuelings([...refuelings, newRefueling]);
  };

  // Filter refuelings based on selected dates
  const filteredRefuelings = useMemo(() => {
    return refuelings.filter(r => {
      if (dateFrom && r.date < dateFrom) return false;
      if (dateTo && r.date > dateTo) return false;
      return true;
    });
  }, [refuelings, dateFrom, dateTo]);

  // Calculate statistics (Note: we calculate stats on ALL refuelings so "previous" is correct chronologically, then filter)
  // Or do we filter first? If we filter first, the previous fillup might be excluded, ruining the calculation for the first element in the filtered view.
  // It's better to calculate stats on ALL refuelings, THEN filter the Displayable stats!
  const stats = useMemo(() => calculateStats(refuelings), [refuelings]);
  
  const filteredStats = useMemo(() => {
    return stats.filter(s => {
      if (dateFrom && s.original.date < dateFrom) return false;
      if (dateTo && s.original.date > dateTo) return false;
      return true;
    });
  }, [stats, dateFrom, dateTo]);

  return (
    <div className="container">
      <header className="header">
        <h1>Üzemanyag Követő</h1>
        <p>Kövesd nyomon tankolásaidat, költségeidet és átlagfogyasztásod</p>
      </header>

      <div className="image-placeholder">
        <p>Ide kerülhet a te saját vagy autód képe</p>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 className="card-title">Szűrés Dátum Szerint</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label className="form-label">-Tól</label>
            <input 
              type="date" 
              className="form-input" 
              value={dateFrom} 
              onChange={e => setDateFrom(e.target.value)} 
            />
          </div>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label className="form-label">-Ig</label>
            <input 
              type="date" 
              className="form-input" 
              value={dateTo} 
              onChange={e => setDateTo(e.target.value)} 
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '0.2rem' }}>
            <button 
              className="btn" 
              onClick={() => { setDateFrom(''); setDateTo(''); }}
              style={{ backgroundColor: 'var(--border-color)' }}
            >
              Törlés
            </button>
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="left-column">
          <RefuelingForm onAdd={handleAddRefueling} />
          <div style={{ marginTop: '1.5rem' }}>
            <MonthlySpending refuelings={filteredRefuelings} />
          </div>
        </div>
        
        <div className="right-column">
          <RefuelingList stats={filteredStats} />
        </div>
      </div>
    </div>
  );
}

export default App;
