import React from 'react';
import Joi from 'joi';
import Form from './common/form';
import { SocketContext } from '../context/socket';

class EnterForm extends Form {
    static contextType = SocketContext;

    state = {
        data: {
            room: '',
        },
        errors: {},
    };

    schema = {
        room: Joi.string().required().length(4).label('Room'),
    };

    doSubmit = () => {
        const { room } = this.state.data;
        this.props.history.push(`/game/${room}`);
    };

    render() {
        return (
            <div className='enter-form'>
                <h1>Enter Game</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('room', 'Room')}
                    {this.renderButton('Login')}
                </form>
            </div>
        );
    }
}

export default EnterForm;
