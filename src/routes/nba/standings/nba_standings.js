import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../../../css/bootstrap.min.css';
import './nba_standings.css'; // Assurez-vous que le fichier CSS est dans le bon chemin
import SortableTable from '../../../components/SortableTable';

// Importation des données depuis le fichier JSON local
import data from './data'; // Assure-toi que le fichier data.js est dans le bon chemin

// Importation des icônes de navigation
import backIcon from '../resources/navigate_before.svg';
import forwardIcon from '../resources/navigate_next.svg';

const DEFAULT_PER_PAGE = 10; // Affichage de 10 équipes par page
const STAT_INDECES = {
    displayName: 'TEAM NAME',  // Nom complet de l'équipe
    id: 'ID',                  // ID de l'équipe
    city: 'CITY',              // Ville de l'équipe
    abbreviation: 'ABBR',      // Abréviation de l'équipe
    eId: 'EID',                // eId de l'équipe
    logo: 'LOGO'               // Logo de l'équipe
};

// Get current season
let init_time = new Date();
if (init_time.getMonth() < 7)
    init_time = init_time.getFullYear()
else
    init_time = init_time.getFullYear()

const NBAStandings = () => {
    const [teams, setTeams] = useState([]);
    const [err, setErr] = useState(null);
    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0);
    const [amount, setAmount] = useState(DEFAULT_PER_PAGE); // Affichage par défaut de 10 équipes par page
    const [time, setTime] = useState(init_time);

    const backYear = () => {
        if (time - 1 > 1950) {
            setTime(time - 1);
            setTeams([]);
        }
    };
    
    const forwardYear = () => {
        let currYear = new Date();
        if (time + 1 < currYear.getFullYear()) {
            setTime(time + 1);
            setTeams([]);
        } else if (time + 1 === currYear.getFullYear() && currYear.getMonth() < 7) {
            setTime(time + 1);
            setTeams([]);
        }
    };

    useEffect(() => {
        // On met directement les équipes de "data.js" dans le state
        setTeams(data.teams); // Toutes les équipes
        setMaxPage(Math.floor(data.teams.length / DEFAULT_PER_PAGE));
    }, [time]);

    return (
        <div className='stats-content'>
            {err && <h2>{err}</h2>}
            <div className='stats-card'>
                <div className='stats-header'>
                    <img className='season-navigation round' src={backIcon} draggable={false} onClick={() => { backYear(); }} />
                    <h2>{time - 1}-{time.toString().substring(2)} NBA Season</h2>
                    <img className='season-navigation round' src={forwardIcon} draggable={false} onClick={() => { forwardYear(); }} />
                </div>

                {teams &&
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
                            stats={teams}
                            indeces={STAT_INDECES}
                            amount={amount}
                            defaultSort='displayName'  // Tri par défaut sur le nom de l'équipe
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
                }
                {!err && !teams && <img id='load' src={`${process.env.PUBLIC_URL}/assets/loading/load_ring.svg`} alt='Fetching data...' />}
            </div>
        </div>
    );
};

export default NBAStandings;
