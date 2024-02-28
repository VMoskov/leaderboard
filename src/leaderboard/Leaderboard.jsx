import { PlayerCard } from '../PlayerCard/PlayerCard';
import { useState, useEffect } from 'react';

export const Leaderboard = () => {
    const [scores, setScores] = useState({});
    const playersFromLS = localStorage.getItem('players');
    const initialPlayers = playersFromLS ? JSON.parse(playersFromLS) : {};
    const [players, setPlayers] = useState(initialPlayers);
    const [playerCardsKey, setPlayerCardsKey] = useState(0); // Initialize key state
    const [sortedPlayers, setSortedPlayers] = useState([]);

    useEffect(() => {
        // Sort the players based on their score
        const sorted = Object.values(players).sort((a, b) => b.score - a.score);
        setSortedPlayers(sorted);
    }, [players]);


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
