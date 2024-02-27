export const PlayerCard = ({ player }) => {
    return (
        <div className="player-card">
            <img src={player.photo} alt="Player"/>
            <h3>{player.name}</h3>
            <p>Score: {player.score}</p>
        </div>
    )
}