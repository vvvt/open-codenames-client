import React, { Component } from 'react';
import Card from './card';
import { SocketContext } from '../context/socket';

class CardMatrix extends Component {
    static contextType = SocketContext;

    state = {
        words: '',
        factions: '',
        leader: true,
    };

    componentDidMount() {
        const socket = this.context;

        socket.emit('join', this.props.room);

        this.context.emit('data', 'data', async data => {
            const { words, factions } = await data;
            this.setState({ words, factions });
        });
    }

    render() {
        const { words, factions, leader } = this.state;

        return (
            <main className='card-container'>
                {factions &&
                    factions.map((row, i) => {
                        return row.map((faction, j) => {
                            return (
                                <Card
                                    key={`${i}-${j}`}
                                    faction={faction ? faction : 0}
                                    word={words ? words[i][j] : '...'}
                                    turned={leader}
                                />
                            );
                        });
                    })}
            </main>
        );
    }
}

export default CardMatrix;
