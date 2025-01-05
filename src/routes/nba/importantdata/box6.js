import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../../../css/bootstrap.min.css';
import './nba_stats.css';  // Utiliser un CSS spécifique pour Box6
import SortableTable from '../../../components/SortableTable';
import data from './box6data'; // Importation des données spécifiques à Box6

const DEFAULT_PER_PAGE = 10;
const STAT_INDECES = {
  name: 'NAME',
  position: 'POSITION',
  minutes_played: 'MINS',
  points: 'PTS',
  assists: 'AST',
  tot_rebounds: 'REB',
  // Ajoutez ici d'autres indices de données spécifiques
};

const Box6 = () => {
  const [stats, setStats] = useState([]);
  const [err, setErr] = useState(null);
  const [page, setPage] = useState(0);
  const [amount, setAmount] = useState(DEFAULT_PER_PAGE);

  useEffect(() => {
    // Utilisation de "players" plutôt que "entities" pour les données dans Box6
    if (data && data.players) {
      setStats(data.players);
    } else {
      setErr('No data available');
    }
  }, []);

  return (
    <div className='stats-content'>
      {err && <h2>{err}</h2>}
      <div className='stats-card'>
        {stats && (
          <div className='stats-body'>
            <div className='stat-table-controls'>
              <div className='control-amount'>
                <select style={{ marginRight: 5 }} value={amount} className='form-black form-black-sm' onChange={e => setAmount(parseInt(e.target.value))}>
                  <option value='10'>10</option>
                  <option value='25'>25</option>
                  <option value='50'>50</option>
                  <option value='100'>100</option>
                </select>
                per page
              </div>
            </div>
            <SortableTable
              stats={stats}
              indeces={STAT_INDECES}
              amount={amount}
              page={page}
              setPage={setPage}
            />
            <div className='stat-navigation' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button disabled={page === 0} style={{ width: '20%', marginRight: '5px' }} variant='success' onClick={() => setPage(0)}>{'<<'}</Button>
              <Button disabled={page === 0} style={{ width: '50%' }} variant='success' onClick={() => setPage(page - 1)}>Prev</Button>
              <div style={{ margin: '0px 20px' }}>Page {page + 1}</div>
              <Button disabled={page === Math.floor(stats.length / amount)} style={{ width: '50%' }} variant='success' onClick={() => setPage(page + 1)}>Next</Button>
              <Button disabled={page === Math.floor(stats.length / amount)} style={{ width: '20%', marginLeft: '5px' }} variant='success' onClick={() => setPage(Math.floor(stats.length / amount))}>{'>>'}</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Box6;
