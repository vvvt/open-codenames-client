import React from 'react';
import styled from '@emotion/styled';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

const Header = styled('header')`
    display: flex;
    flex-direction: row;
    height: 5vh;
    justify-content: space-between;
    padding: 1vw;
    color: white;
    align-items: center;
`;

const Room = styled('span')`
    font-size: 1em !important;
`;

const GameHeader = ({ room, onClick, isLeader, redCount, blueCount }) => {
    return (
        <Header>
            <Room className='badge bg-light text-dark'>{`Raum: ${room}`}</Room>
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
        </Header>
    );
};

export default GameHeader;
