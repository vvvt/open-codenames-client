import React from 'react';
import styled from '@emotion/styled';
import { gradients, colors } from '../style/colors';

const CardBody = styled('div')`
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    font-size: xx-large;
    color: white;
    background: rgba(255, 255, 255, 0.2);
    user-select: none;
    position: relative;
    box-sizing: border-box;
    padding: 20px;
`;

const CardText = styled('span')``;

class Card extends React.Component {
    render() {
        const { type, word, turned, onClick, isLeader } = this.props;

        return (
            <CardBody
                className='card'
                style={{
                    background: (turned || isLeader) && gradients[type],
                    transform: isLeader && turned && 'rotate(0deg) scale(0.8)',
                    opacity: isLeader && turned && 0.3,
                    border: isLeader && turned && 'none',
                }}
                onClick={() => onClick(word)}
            >
                <CardText>{word}</CardText>
            </CardBody>
        );
    }
}

export default Card;
