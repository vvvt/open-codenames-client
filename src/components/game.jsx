import React, { Component } from 'react';
import styled from '@emotion/styled';
import GameBoard from './gameBoard';
import GameHeader from './gameHeader';
import { SocketContext } from '../context/socket';

const GameContainer = styled('div')`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    background-color: #2d2d2d;
`;

class Game extends Component {
    static contextType = SocketContext;

    state = {
        gameData: '',
        redCount: 0,
        blueCount: 0,
        isLeader: false,
    };

    componentDidMount() {
        const socket = this.context;
        const { room } = this.props.match.params;

        socket.emit('join', room);

        this.context.emit('data', 'data', async currentGameData => {
            const gameData = await currentGameData.data;
            console.log(gameData);
            const redCount = gameData
                .flat()
                .filter(word => word.type === 'red' && word.turned === false)
                .length;
            const blueCount = gameData
                .flat()
                .filter(word => word.type === 'blue' && word.turned === false)
                .length;
            this.setState({ gameData, redCount, blueCount });
        });

        socket.on('turn', currentGameData => {
            const gameData = currentGameData;
            const redCount = gameData
                .flat()
                .filter(word => word.type === 'red' && word.turned === false)
                .length;
            const blueCount = gameData
                .flat()
                .filter(word => word.type === 'blue' && word.turned === false)
                .length;
            this.setState({ gameData, redCount, blueCount });
        });
    }

    handleReveal = () => {
        this.setState({ isLeader: !this.state.isLeader });
    };

    handleTurn = word => {
        if (this.state.isLeader) return;
        const socket = this.context;
        const gameData = [...this.state.gameData];
        let turnedCard;
        gameData.forEach(row => {
            const target = row.find(entry => entry.word === word);
            if (target && !target.turned) {
                target.turned = true;
                turnedCard = target;
            }
        });
        if (turnedCard) socket.emit('turn', gameData);
    };

    render() {
        const { room } = this.props.match.params;
        const { gameData, isLeader, redCount, blueCount } = this.state;

        return (
            <GameContainer className='game-container'>
                <GameHeader
                    room={room}
                    redCount={redCount}
                    blueCount={blueCount}
                    isLeader={isLeader}
                    onClick={this.handleReveal}
                />
                <GameBoard
                    room={room}
                    gameData={gameData}
                    isLeader={isLeader}
                    onClick={this.handleTurn}
                />
            </GameContainer>
        );
    }
}

export default Game;
