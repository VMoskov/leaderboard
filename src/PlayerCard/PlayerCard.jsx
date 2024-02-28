export const PlayerCard = ({ player, order }) => {
    return (
        <div className='player-card' style={{ order: order }}>
            <img src={ player.photo } alt='Player'/>
            <h3>{ player.name }</h3>
            <p>Score: { player.score }</p>
        </div>
    )
}