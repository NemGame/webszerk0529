import { useState } from 'react';
import { Refueling } from '../types';

interface Props {
  onAdd: (refueling: Omit<Refueling, 'id'>) => void;
}

export const RefuelingForm: React.FC<Props> = ({ onAdd }) => {
  const [date, setDate] = useState('');
  const [fuelAmount, setFuelAmount] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [odometer, setOdometer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !fuelAmount || !paidAmount || !odometer) return;

    onAdd({
      date,
      fuelAmount: Number(fuelAmount),
      paidAmount: Number(paidAmount),
      odometer: Number(odometer)
    });

    // Reset Form
    setDate('');
    setFuelAmount('');
    setPaidAmount('');
    setOdometer('');
  };

  return (
    <div className="card">
      <h2 className="card-title">Új tankolás rögzítése</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Dátum</label>
          <input
            type="date"
            className="form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Tankolt mennyiség (liter)</label>
          <input
            type="number"
            step="0.01"
            className="form-input"
            value={fuelAmount}
            onChange={(e) => setFuelAmount(e.target.value)}
            required
            placeholder="Pl. 42.5"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Fizetett összeg (Ft)</label>
          <input
            type="number"
            className="form-input"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
            required
            placeholder="Pl. 25000"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Kilométeróra állása (km)</label>
          <input
            type="number"
            className="form-input"
            value={odometer}
            onChange={(e) => setOdometer(e.target.value)}
            required
            placeholder="Pl. 115000"
          />
        </div>
        <button type="submit" className="btn">Rögzítés</button>
      </form>
    </div>
  );
};
