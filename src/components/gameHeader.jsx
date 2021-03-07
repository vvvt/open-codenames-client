import React from 'react';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

const GameHeader = ({ room, onClick, isLeader, redCount, blueCount }) => {
    return (
        <header>
            <span className='room-indicator badge bg-light text-dark'>{`Raum: ${room}`}</span>
            <span>
                <span className='badge bg-danger'>{redCount}</span> Karten übrig
            </span>
            <span>
                <span className='badge bg-primary'>{blueCount}</span> Karten
                übrig
            </span>
            {isLeader ? (
                <button className='btn btn-outline-primary' onClick={onClick}>
                    <EyeSlashFill size={24} />
                </button>
            ) : (
                <button className='btn btn-primary' onClick={onClick}>
                    <EyeFill size={24} />
                </button>
            )}
        </header>
    );
};

export default GameHeader;
