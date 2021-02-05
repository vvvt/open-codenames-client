import React, { Component } from 'react';
import CardMatrix from './cardMatrix';
import GameHeader from './gameHeader';

class GameBoard extends Component {
    render() {
        const { room } = this.props.match.params;

        return (
            <div className='game-container'>
                <GameHeader room={room} />
                <CardMatrix room={room} />
            </div>
        );
    }
}

export default GameBoard;
