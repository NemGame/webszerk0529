
import { RefuelingStats } from '../types';

interface Props {
  stats: RefuelingStats[];
}

export const RefuelingList: React.FC<Props> = ({ stats }) => {
  // Sort by efficiency (lowest L/100km is best => rank 1), only keeping those with calculated efficiency
  const rankableStats = stats.filter(s => s.efficiency !== null);
  const sortedByEfficiency = [...rankableStats].sort((a, b) => (a.efficiency as number) - (b.efficiency as number));
  
  const getRank = (stat: RefuelingStats) => {
    if (stat.efficiency === null) return null;
    return sortedByEfficiency.findIndex(s => s.original.id === stat.original.id) + 1;
  };

  return (
    <div className="card">
      <h2 className="card-title">Tankolások listája ({stats.length} db)</h2>
      
      {stats.length === 0 ? (
        <p className="text-secondary">Még nincs megjeleníthető tankolás a kiválasztott intervallumban.</p>
      ) : (
        <div className="list">
          {/* Reverse chronologically for viewing */}
          {[...stats].reverse().map(stat => {
            const rank = getRank(stat);
            
            return (
              <div key={stat.original.id} className="list-item">
                <div className="flex-between">
                  <strong>{new Date(stat.original.date).toLocaleDateString('hu-HU')}</strong>
                  <span className="text-danger">-{stat.original.paidAmount.toLocaleString('hu-HU')} Ft</span>
                </div>
                
                <div className="flex-between text-secondary" style={{ fontSize: '0.875rem' }}>
                  <span>Tankolt: {stat.original.fuelAmount} L</span>
                  <span>Óra: {stat.original.odometer} km</span>
                </div>

                {stat.distanceDriven !== null && stat.efficiency !== null ? (
                  <div className="flex-between" style={{ marginTop: '0.5rem', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '4px' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem' }} className="text-secondary">Megtett út:</div>
                      <strong>{stat.distanceDriven} km</strong>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem' }} className="text-secondary">Fogyasztás:</div>
                      <strong>{stat.fuelConsumed} L</strong>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem' }} className="text-secondary">Átlag / Rangsor:</div>
                      <strong className="text-success">{stat.efficiency.toFixed(2)} L/100km</strong>
                      <span className="tag" style={{ marginLeft: '0.5rem' }}>#{rank}</span>
                    </div>
                  </div>
                ) : (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.8rem' }} className="text-secondary">
                    <em>(Nincs előző tankolás az átlagfogyasztás számításához)</em>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
