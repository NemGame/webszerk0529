import { useMemo } from 'react';
import { Refueling } from '../types';
import { getMonthlySpending } from '../utils';

interface Props {
  refuelings: Refueling[];
}

export const MonthlySpending: React.FC<Props> = ({ refuelings }) => {
  const spending = useMemo(() => getMonthlySpending(refuelings), [refuelings]);
  const months = Object.keys(spending).sort((a, b) => b.localeCompare(a)); // Legújabb elöl

  return (
    <div className="card">
      <h2 className="card-title">Havi költések</h2>
      {months.length === 0 ? (
        <p className="text-secondary">Még nincs rögzített tankolás.</p>
      ) : (
        <div className="stats-grid">
          {months.map(month => (
            <div key={month} className="stat-box">
              <div className="stat-value">{spending[month].toLocaleString('hu-HU')} Ft</div>
              <div className="stat-label">{month}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
