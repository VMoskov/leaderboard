import { useState, useEffect } from 'react';
import { Leaderboard } from "../Leaderboard/Leaderboard";

export const InputForm = () => {
    const [playerName, setPlayerName] = useState('');
    const [playerPhoto, setPlayerPhoto] = useState('');
    const [players, setPlayers] = useState({});
    const [playerIndex, setPlayerIndex] = useState(1);
    const [arePlayersLoaded, setArePlayersLoaded] = useState(false);

    // Load data from localStorage on component mount
    useEffect(() => {
        const storedPlayers = localStorage.getItem('players');
        const storedPlayerIndex = localStorage.getItem('playerIndex');

        if (storedPlayers) {
            setPlayers(JSON.parse(storedPlayers));
        }
        else {
            localStorage.setItem('players', JSON.stringify({}));
        }

        if (storedPlayerIndex) {
            setPlayerIndex(parseInt(storedPlayerIndex));
        }
        else {
            localStorage.setItem('playerIndex', '1');
        }
    }, []);

    // Save data to localStorage whenever players or playerIndex change
    useEffect(() => {
        const storedPlayers = JSON.parse(localStorage.getItem('players'));
        if (storedPlayers && Object.keys(storedPlayers).length > Object.keys(players).length) return;
        localStorage.setItem('players', JSON.stringify(players));
    }, [players]);

    useEffect(() => {
        if(localStorage.getItem('playerIndex') > String(playerIndex)) return;
        localStorage.setItem('playerIndex', String(playerIndex));
    }, [playerIndex]);

    useEffect(() => {
        if (playerIndex === 6) {
            fetch('http://localhost:8080/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ players })
            })
                .then(response => response.text())
                .then(data => console.log(data))
                .catch(error => console.error(error));
            setArePlayersLoaded(true)
        }
    }, [playerIndex, players]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const fileInput = document.getElementById('playerPhoto');

        if (fileInput && fileInput.files && fileInput.files.length > 0) { // Check if a file is selected
            const file = fileInput.files[0];
            const dataURL = URL.createObjectURL(file);

            setPlayers(prevPlayers => ({
                ...prevPlayers,
                [playerName]: {
                    name: playerName,
                    photo: dataURL,
                    score: 0
                }
            }));

            setPlayerIndex(playerIndex + 1);
            setPlayerName('');
            fileInput.value = '';
            setPlayerPhoto('');
        }
        else {
            console.error('No file selected');
        }
    };

    if(arePlayersLoaded) return <Leaderboard />;

    return (
        <div className='input-form'>
            <h2>Player { playerIndex }</h2>
            <form onSubmit={ handleSubmit } encType='multipart/form-data'>
                <label htmlFor='playerName'>Player name:</label><br />
                <input
                    type='text'
                    id='playerName'
                    name='playerName'
                    value={ playerName }
                    onChange={(e) => setPlayerName(e.target.value)}
                    required
                /><br /><br />

                <label htmlFor='playerPhoto'>Player Photo:</label><br />
                <input
                    type='file'
                    id='playerPhoto'
                    name='playerPhoto'
                    required
                /><br /><br />

                <input type='submit' value='Submit' />
            </form>
        </div>
    );
};
