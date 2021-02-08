import React from 'react';
import Card from './card';

const GameBoard = ({ gameData, isLeader, onClick }) => {
    return (
        <main className='card-container'>
            {gameData &&
                gameData.map((row, i) => {
                    return row.map((entry, j) => {
                        const { color, word, turned } = entry;
                        return (
                            <Card
                                key={`${i}-${j}`}
                                color={color}
                                word={word}
                                turned={turned || isLeader}
                                onClick={onClick}
                            />
                        );
                    });
                })}
        </main>
    );
};

export default GameBoard;
