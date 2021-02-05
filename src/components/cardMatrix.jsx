import React, { Component } from 'react';
import Card from './card';
import { SocketContext } from '../context/socket';

class CardMatrix extends Component {
    static contextType = SocketContext;

    state = {
        gameData: '',
    };

    componentDidMount() {
        const socket = this.context;

        socket.emit('join', this.props.room);

        this.context.emit('data', 'data', async currentGameData => {
            const gameData = await currentGameData.data;
            this.setState({ gameData });
        });

        socket.on('turn', currentGameData => {
            const gameData = currentGameData;
            console.log(gameData);
            console.log('Got turned data from Server');
            this.setState({ gameData });
        });
    }

    handleClick = word => {
        const socket = this.context;
        const gameData = [...this.state.gameData];
        gameData.forEach(row => {
            const target = row.find(entry => entry.word === word);
            if (target) target.turned = true;
        });
        socket.emit('turn', gameData);
    };

    render() {
        const { gameData } = this.state;

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
                                    turned={turned}
                                    onClick={this.handleClick}
                                />
                            );
                        });
                    })}
            </main>
        );
    }
}

export default CardMatrix;
