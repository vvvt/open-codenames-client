import React from 'react';
import Joi from 'joi';
import styled from '@emotion/styled';
import Form from './common/form';
import { SocketContext } from '../context/socket';

const FormContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 77vh;
    justify-content: center;
`;

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
            <FormContainer className='enter-form'>
                <h1>Enter Game</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('room', 'Room')}
                    {this.renderButton('Login')}
                </form>
            </FormContainer>
        );
    }
}

export default EnterForm;
