import { PlayerCard } from '../PlayerCard/PlayerCard';

export const Leaderboard = ({ players }) => {
    return (
        <div className='leaderboard'>
            <div className='player-cards'>
                {Object.keys(players).map((playerKey, index) => (
                    <PlayerCard key={index} player={players[playerKey]}/>
                ))}
            </div>
            <div className='bottom-container'>
                <button className='load-button'>Load</button>
            </div>
        </div>
    );
}