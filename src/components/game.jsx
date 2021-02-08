import React, { Component } from 'react';
import GameBoard from './gameBoard';
import GameHeader from './gameHeader';
import { SocketContext } from '../context/socket';

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
            const redCount = gameData
                .flat()
                .filter(
                    word => word.color === '#ff736c' && word.turned === false
                ).length;
            const blueCount = gameData
                .flat()
                .filter(
                    word => word.color === '#6cbbff' && word.turned === false
                ).length;
            this.setState({ gameData, redCount, blueCount });
        });

        socket.on('turn', currentGameData => {
            const gameData = currentGameData;
            const redCount = gameData
                .flat()
                .filter(word => word.color === '#ff736c').length;
            const blueCount = gameData
                .flat()
                .filter(word => word.color === '#6cbbff').length;
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
            <div className='game-container'>
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
            </div>
        );
    }
}

export default Game;
