import React from 'react';
import useFitText from 'use-fit-text';
import styled from '@emotion/styled';
import { gradients } from '../style/colors';

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

function CardText({ children }) {
    const { fontSize, ref } = useFitText();

    return (
        <div
            ref={ref}
            style={{
                fontSize,
                height: 50,
                width: '100%',
                textAlign: 'center',
            }}
        >
            {children}
        </div>
    );
}

class Card extends React.Component {
    render() {
        const { type, word, turned, onClick, isLeader } = this.props;

        return (
            <CardBody
                className='card'
                style={{
                    background: (turned || isLeader) && gradients[type],
                    transform: isLeader && turned && 'scale(0.8)',
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
