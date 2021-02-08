import React from 'react';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

const GameHeader = ({ room, onClick, isLeader }) => {
    return (
        <header>
            <span className='room-indicator badge bg-light text-dark'>{`Raum: ${room}`}</span>

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
