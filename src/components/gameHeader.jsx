import React from 'react';

const GameHeader = ({ room }) => {
    return (
        <header>
            <span className='badge bg-light text-dark'>{`Raum: ${room}`}</span>
            <button className='btn btn-primary'>Spiel Beenden</button>
        </header>
    );
};

export default GameHeader;
