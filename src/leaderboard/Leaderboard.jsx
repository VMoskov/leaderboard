import {PlayerCard} from '../PlayerCard/PlayerCard';
import {useEffect, useState} from 'react';

export const Leaderboard = () => {
    const [scores, setScores] = useState({});
    const playersFromLS = localStorage.getItem('players');
    const initialPlayers = playersFromLS ? JSON.parse(playersFromLS) : {};
    const [players, setPlayers] = useState(initialPlayers);
    const [playerCardsKey, setPlayerCardsKey] = useState(0); // Initialize key state
    const [sortedPlayers, setSortedPlayers] = useState([]);

    useEffect(() => {
        // Sort the players based on their score
        const sorted = Object.values(players).sort((a, b) => a.score - b.score);
        setSortedPlayers(sorted);
    }, [players]);


    const switchPlaces = () => {
        const playerCards = document.querySelectorAll('.player-card');
        const cardWidth = playerCards[0].offsetWidth;

        const cardsPerRow = 5

        const translateX = cardWidth * (cardsPerRow - 1);

        // Apply new transform to each player card
        playerCards.forEach((card, index) => {
            const col = index % cardsPerRow;
            card.style.transform = `translateX(${col * translateX * 0.0001}vh)`; // Apply the transform
        });
    };

    const loadScores = () => {
        fetch('http://localhost:8080/')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setScores(data);
                // Create a new object with updated scores
                const updatedPlayers = { ...players };
                for(let playerKey in data) {
                    if(updatedPlayers[playerKey]) {
                        updatedPlayers[playerKey].score = data[playerKey];
                    }
                }
                // Set the players state with the new object
                setPlayers(updatedPlayers);
            })
            .catch(error => console.error(error));
        switchPlaces();
    };

    return (
        <div className='leaderboard'>
            <div className='player-cards'>
                {sortedPlayers.map((player, index) => (
                    <PlayerCard key={player.name} player={player} order={index + 1} />
                ))}
            </div>
            <div className='bottom-container'>
                <button onClick={loadScores} className='load-button'>Load</button>
            </div>
        </div>
    );
};
