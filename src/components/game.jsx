import React, { Component } from 'react';
import GameBoard from './gameBoard';
import GameHeader from './gameHeader';
import { SocketContext } from '../context/socket';

class Game extends Component {
    static contextType = SocketContext;

    state = {
        gameData: '',
    };

    componentDidMount() {
        const socket = this.context;
        const { room } = this.props.match.params;

        socket.emit('join', room);

        this.context.emit('data', 'data', async currentGameData => {
            const gameData = await currentGameData.data;
            this.setState({ gameData });
        });

        socket.on('turn', currentGameData => {
            const gameData = currentGameData;
            this.setState({ gameData });
        });
    }

    /* handleReveal = () => {}; */

    handleTurn = word => {
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
        const { gameData } = this.state;

        return (
            <div className='game-container'>
                <GameHeader room={room} />
                <GameBoard
                    room={room}
                    gameData={gameData}
                    onClick={this.handleTurn}
                />
            </div>
        );
    }
}

export default Game;
