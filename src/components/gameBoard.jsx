import React from 'react';
import styled from '@emotion/styled';
import Card from './card';

const CardGrid = styled('main')`
    height: 95vh;
    width: 100vw;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 1vw;
    padding: 1vw;
    padding-bottom: 1vw;
    box-sizing: border-box;
`;

const GameBoard = ({ gameData, isLeader, onClick }) => {
    return (
        <CardGrid className='card-container'>
            {gameData &&
                gameData.map((row, i) => {
                    return row.map((entry, j) => {
                        const { type, word, turned } = entry;
                        return (
                            <Card
                                key={`${i}-${j}`}
                                type={type}
                                word={word}
                                turned={turned || isLeader}
                                onClick={onClick}
                            />
                        );
                    });
                })}
        </CardGrid>
    );
};

export default GameBoard;
