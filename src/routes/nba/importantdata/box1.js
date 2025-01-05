import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../../../css/bootstrap.min.css';
import './nba_stats.css';
import SortableTable from '../../../components/SortableTable';
import data from './box1data'; // Assurez-vous que le fichier de données est correctement importé

const STAT_INDECES = {
  name: 'NAME',
  position: 'POS',
  minutes_played: 'MINS',
  points: 'PTS',
  assists: 'AST',
  tot_rebounds: 'REB',
  off_rebounds: 'OREB',
  def_rebounds: 'DREB',
  fg_made: 'FGM',
  fg_attempted: 'FGA',
  fg_percent: 'FG%',
  threes_made: '3PM',
  threes_attempted: '3PA',
  threes_percent: '3P%',
  ft_made: 'FTM',
  ft_attempted: 'FTA',
  ft_percent: 'FT%',
};

const DEFAULT_PER_PAGE = 25;

const Box1 = () => {  // Le nom du composant doit commencer par une majuscule
  const [stats, setStats] = useState(null);
  const [err, setErr] = useState(null);
  const [page, setPage] = useState(0);
  const [amount, setAmount] = useState(DEFAULT_PER_PAGE);

  useEffect(() => {
    if (data && data.players) {
      setStats(data.players);
    } else {
      setErr("No data available");
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
            <SortableTable stats={stats} indeces={STAT_INDECES} amount={amount} page={page} setPage={setPage} />
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
}

export default Box1; // Le nom du fichier doit aussi correspondre à Box1.js
