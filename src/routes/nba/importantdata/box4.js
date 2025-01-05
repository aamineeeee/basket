import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../../../css/bootstrap.min.css';
import './sponsors.css';  // Vous pouvez aussi utiliser un autre fichier CSS si nécessaire
import SortableTable from '../../../components/SortableTable';

// Importation des données des sponsors (remplacez cela par vos propres données)
import data from './box4data'; // Importation des données de sponsors

const DEFAULT_PER_PAGE = 10; // Affichage par défaut de 10 sponsors par page

// Définition des colonnes du tableau
const STAT_INDECES = {
  name: 'SPONSOR NAME',   // Nom du sponsor
  id: 'ID',               // ID du sponsor
  industry: 'INDUSTRY',   // Industrie du sponsor
  country: 'COUNTRY',     // Pays du sponsor
  logo: 'LOGO',           // Logo du sponsor
  city: 'CITY'            // Ville du sponsor
};

const Box4 = () => {
  const [sponsors, setSponsors] = useState([]); // Données des sponsors
  const [err, setErr] = useState(null);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [amount, setAmount] = useState(DEFAULT_PER_PAGE); // Nombre de sponsors par page

  useEffect(() => {
    // Chargez les données des sponsors depuis 'data' (remplacer par vos propres données si nécessaire)
    if (data && data.sponsors) {
      setSponsors(data.sponsors);  // Mise à jour de l'état avec les sponsors
      setMaxPage(Math.floor(data.sponsors.length / DEFAULT_PER_PAGE)); // Calcul du nombre de pages
    } else {
      setErr("No data available");  // Si aucune donnée n'est disponible
    }
  }, []);

  return (
    <div className='stats-content'>
      {err && <h2>{err}</h2>}
      <div className='stats-card'>
        {sponsors && (
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
              stats={sponsors}  // Affichage des sponsors
              indeces={STAT_INDECES}  // Utilisation des indices de tri pour les sponsors
              amount={amount}
              defaultSort='name'  // Tri par défaut sur le nom du sponsor
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

export default Box4;
