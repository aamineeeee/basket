import './nba_scores.css';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../../../css/bootstrap.min.css';
import BoxScore from './BoxScore.js';
import { NBAteams } from '../../../teams';

import navigateRightIcon from '../resources/navigate_next.svg';
import navigateLeftIcon from '../resources/navigate_before.svg';

let selectedDate = new Date();
let navDate = new Date();
const currDate = new Date();
const days = ['Su', 'M', 'T', 'W', 'Th', 'F', 'S'];

// Utilisation de l'ID pour obtenir le chemin de l'image du logo de l'équipe
const getImage = (eId) => {
    return `${process.env.PUBLIC_URL}/assets/images/nba_logos/${eId}.svg`;
}

const getGameTime = (time) => {
    return new Date(time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

const getStatus = (game) => {
    try {
        if (!game.status.type.completed && game.status.type.state === 'pre')
            return <h3>{getGameTime(game.date)}</h3>
        else if (!game.status.type.completed)
            return <h3 style={{ color: 'red', fontWeight: 'bold' }}>{'Q' + game.status.period + ' ' + game.status.displayClock}</h3>;
        else
            return <h3>Final</h3>
    } catch (err) {
        return <h3>{err}</h3>
    }
}

const idFromEId = (eId) => {
    for (let i = 0; i < NBAteams.length; i += 1) {
        if (NBAteams[i].eId === eId) {
            return NBAteams[i].id;
        }
    }
    return null;
}

const Scores = () => {
    const [data, setData] = useState(null);
    const [errmsg, setErrmsg] = useState(null);
    const [gameInfo, setGameInfo] = useState(null);
    const [boxClicked, setBoxClicked] = useState(false);
    const [refreshDate, setRefreshDate] = useState(false);

    // Dummy data: 4 matchs avec 8 équipes distinctes
    const games = [
        {
            id: 1,
            competitors: [
                { team: { id: 1610612747, abbreviation: "LAL", displayName: "Los Angeles Lakers" }, score: 105 },
                { team: { id: 1610612738, abbreviation: "BOS", displayName: "Boston Celtics" }, score: 97 }
            ],
            date: "2023-12-12T19:30:00Z",
            status: { type: { completed: false }, period: 1, displayClock: "12:34" }
        },
        {
            id: 2,
            competitors: [
                { team: { id: 1610612741, abbreviation: "CHI", displayName: "Chicago Bulls" }, score: 100 },
                { team: { id: 1610612744, abbreviation: "GSW", displayName: "Golden State Warriors" }, score: 110 }
            ],
            date: "2023-12-12T21:00:00Z",
            status: { type: { completed: false }, period: 2, displayClock: "10:23" }
        },
        {
            id: 3,
            competitors: [
                { team: { id: 1610612759, abbreviation: "SAS", displayName: "San Antonio Spurs" }, score: 120 },
                { team: { id: 1610612752, abbreviation: "NYK", displayName: "New York Knicks" }, score: 115 }
            ],
            date: "2023-12-12T22:00:00Z",
            status: { type: { completed: false }, period: 3, displayClock: "8:12" }
        },
        {
            id: 4,
            competitors: [
                { team: { id: 1610612755, abbreviation: "PHI", displayName: "Philadelphia 76ers" }, score: 98 },
                { team: { id: 1610612748, abbreviation: "MIA", displayName: "Miami Heat" }, score: 92 }
            ],
            date: "2023-12-13T00:00:00Z",
            status: { type: { completed: false }, period: 1, displayClock: "15:43" }
        }
    ];

    useEffect(() => {
        setData(games); // Nous gardons les mêmes 4 matchs chaque fois
    }, []);

    const boxPress = (game) => {
        setGameInfo(game);
        setBoxClicked(true);
    }

    // Fonction pour changer la semaine affichée
    const weekPress = (where) => {
        let diff = where === 'start' ? 7 : -7;
        let first = new Date(navDate);
        const firstDiff = first.getDate() + diff;
        first.setDate(firstDiff);
        navDate = first;
        setRefreshDate(!refreshDate);
    }

    // Fonction pour revenir à la date d'aujourd'hui
    const dateToday = () => {
        setData(null); // Réinitialisation des données
        selectedDate.setTime(currDate.getTime());
        navDate.setTime(currDate.getTime());
        setGameInfo(null);
        setBoxClicked(false);
    }

    // Rendu du calendrier avec les jours de la semaine
    const renderControls = () => {
        let week = [];
        for (let i = 0; i < 7; i += 1)
            week.push(i);

        return (
            <div className='controls'>
                <img className='controls-week-navigation round' src={navigateLeftIcon} draggable={false} alt='Back 1 week' onClick={() => {weekPress('end')}} />
                {week.map((day) => {
                    let first = new Date(navDate);
                    const firstDiff = first.getDate() - first.getDay();
                    first.setDate(firstDiff);
                    first.setDate(first.getDate() + day);

                    let classes = first.toDateString() === selectedDate.toDateString() ? 'calendar-button-selected round' : 'calendar-button round';

                    return (
                        <button key={`calendar-day-${day}`} id={`calendar-day-${day}`} className={classes} onClick={() => {selectedDate = first; setData(null); setGameInfo(null);}}>
                            <div style={{fontSize: 10}}>{first.getDate()}</div>
                            <div>{days[first.getDay()]}</div>
                        </button>
                    )
                })}
                <img className='controls-week-navigation round' src={navigateRightIcon} draggable={false} alt='Forward 1 week' onClick={() => {weekPress('start')}} />
            </div>
        )
    }

    return (
        <div className='score-content'>
            <h4 className='calendar-header' onClick={() => {dateToday()}}>{navDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>

            {renderControls()}

            <div className='games'>
                {!data ? '' : (
                    data.map(game => {
                        return (
                            <div key={game.id}>
                                <h2>
                                    <img src={getImage(game.competitors[0].team.id)} alt={game.competitors[0].team.displayName} draggable={false} height='50' />
                                    {game.competitors[0].team.abbreviation} vs {game.competitors[1].team.abbreviation}
                                    <img src={getImage(game.competitors[1].team.id)} alt={game.competitors[1].team.displayName} draggable={false} height='50' />
                                </h2>
                                <p>{game.competitors[0].score} : {game.competitors[1].score}</p>
                                {getStatus(game)}
                                <Button variant='dark' onClick={() => boxPress(game)}>Box Score</Button>{' '}
                            </div>
                        );
                    })
                )}
            </div>

            {boxClicked && gameInfo && <BoxScore gameData={gameInfo} />}
        </div>
    );
}

export default Scores;
