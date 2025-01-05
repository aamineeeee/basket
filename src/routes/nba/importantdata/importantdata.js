import React, { useState, useEffect } from 'react';
import './importantdata.css';
import Box1 from './box1';  // Importer le composant Box1 ici
import Box2 from './box2';  // Importer le composant Box2 ici
import Box3 from './box3';  // Importer le composant Box3 ici
import Box4 from './box4';  // Importer le composant Box4 ici
import Box5 from './box5';  // Importer le composant Box5 ici
import Box6 from './box6';  // Importer le composant Box6 ici
import Box7 from './box7';  // Importer le composant Box7 ici

const boxData = [
  { title: 'First 10 players with the greatest total number of points for their national teams ever', content: 'Contenu des 10 premiers joueurs par points...', component: 'Box1' },
  { title: 'First 3 players with the greatest free throws percentage in a final of the European Championship 2002', content: 'Contenu des 3 premiers joueurs en pourcentage de lancers francs...', component: 'Box2' },
  { title: 'Clubs with the highest average height', content: 'Contenu des clubs ayant la plus haute moyenne de taille...', component: 'Box3' },
  { title: 'Sponsors with the highest revenue', content: 'Contenu des sponsors ayant les revenus les plus élevés...', component: 'Box4' },
  { title: 'Players with the greatest percentage of 3 points in the current season', content: 'Contenu des meilleurs joueurs en pourcentage de 3 points...', component: 'Box5' },
  { title: 'Which player has the most number of assists per game', content: 'Contenu du joueur avec le plus d\'assists par match...', component: 'Box6' },
  { title: 'Clubs who won the Euroleague more than 3 times', content: 'Contenu des clubs ayant gagné l\'Euroleague plus de 3 fois...', component: 'Box7' },
];

const ImportantData = () => {
  const [selectedComponent, setSelectedComponent] = useState('Box1'); // Par défaut, la première box est sélectionnée

  const handleBoxClick = (component) => {
    setSelectedComponent(component);  // Met à jour la box sélectionnée
  };

  useEffect(() => {
    if (boxData.length > 0) {
      setSelectedComponent(boxData[0].component); // Assurer que la première box est sélectionnée
    }
  }, []);

  return (
    <div className="important-data-container">
      <div className="boxes">
        {boxData.map((box, index) => (
          <div 
            key={index} 
            className={`box ${selectedComponent === box.component ? 'active' : ''}`}  // Appliquer la classe 'active' si la box est sélectionnée
            onClick={() => handleBoxClick(box.component)} 
            style={{ cursor: 'pointer' }}
          >
            {/* Appliquez un style inline pour la taille du texte et la couleur */}
            <h3 style={{ fontSize: '18px', color: selectedComponent === box.component ? 'white' : '#007bff' }}>
              {box.title}
            </h3>
          </div>
        ))}
      </div>

      {/* Affichage dynamique des composants */}
      {selectedComponent === 'Box1' && <Box1 />}
      {selectedComponent === 'Box2' && <Box2 />}
      {selectedComponent === 'Box3' && <Box3 />}
      {selectedComponent === 'Box4' && <Box4 />}
      {selectedComponent === 'Box5' && <Box5 />}
      {selectedComponent === 'Box6' && <Box6 />}
      {selectedComponent === 'Box7' && <Box7 />}
    </div>
  );
};

export default ImportantData;
