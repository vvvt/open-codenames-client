import React from 'react';

const GameHeader = ({ room }) => {
    return (
        <header>
            <span className='badge bg-light text-dark'>{`Raum: ${room}`}</span>
            <button className='btn btn-primary'>Spielleiter</button>
        </header>
    );
};

export default GameHeader;
