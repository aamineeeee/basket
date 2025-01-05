import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../../../css/bootstrap.min.css';
import './nba_standings.css';  // Assurez-vous d'utiliser le bon CSS
import SortableTable from '../../../components/SortableTable';

// Importation des données des clubs depuis 'box3data.js'
import data from './box3data'; // Importation des données de clubs

const DEFAULT_PER_PAGE = 10; // Affichage par défaut de 10 clubs par page

const STAT_INDECES = {
  displayName: 'CLUB NAME',  // Nom complet du club
  city: 'CITY',              // Ville du club
  abbreviation: 'ABBR',      // Abréviation du club
  logo: 'LOGO',              // Logo du club
};

const Box3 = () => {
  const [clubs, setClubs] = useState([]); // Données des clubs
  const [err, setErr] = useState(null);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [amount, setAmount] = useState(DEFAULT_PER_PAGE); // Nombre de clubs par page

  useEffect(() => {
    // Charger les données des clubs depuis 'data.teams'
    if (data && data.teams) {
      setClubs(data.teams);  // Mise à jour de l'état avec les clubs
      setMaxPage(Math.floor(data.teams.length / DEFAULT_PER_PAGE));  // Calcul du nombre de pages
    } else {
      setErr("No data available");  // Affichage d'une erreur si les données sont absentes
    }
  }, []);

  return (
    <div className='stats-content'>
      {err && <h2>{err}</h2>}
      <div className='stats-card'>
        {clubs && (
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
              stats={clubs}  // Affichage des clubs
              indeces={STAT_INDECES}  // Utilisation des indices de tri pour les clubs
              amount={amount}
              defaultSort='displayName'  // Tri par défaut sur le nom du club
              page={page}
              setPage={setPage}
              setMaxPage={setMaxPage}
            />
            <div className='stat-navigation' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button disabled={page === 0} style={{ width: '20%', marginRight: '5px' }} variant='success' onClick={() => { setPage(0); }}>{'<<'}</Button>
              <Button disabled={page === 0} style={{ width: '50%' }} variant='success' onClick={() => { setPage(page - 1); }}>Prev</Button>
              <div style={{ margin: '0px 20px' }}>Page {page + 1}/{maxPage + 1}</div>
              <Button disabled={page === maxPage} style={{ width: '50%' }} variant='success' onClick={() => { setPage(page + 1); }}>Next</Button>
              <Button disabled={page === maxPage} style={{ width: '20%', marginLeft: '5px' }} variant='success' onClick={() => { setPage(maxPage); }}>{'>>'}</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Box3;
