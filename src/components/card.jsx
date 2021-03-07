import React from 'react';
import styled from '@emotion/styled';
import colors from '../style/colors';

const CardBody = styled('div')`
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    font-size: xx-large;
    color: white;
    background: rgba(255, 255, 255, 0.2);
    user-select: none;
`;

const CardText = styled('span')``;

class Card extends React.Component {
    render() {
        const { type, word, turned, onClick } = this.props;

        return (
            <CardBody
                className='card'
                style={{
                    background: turned && colors[type],
                }}
                onClick={() => onClick(word)}
            >
                <CardText>{word}</CardText>
            </CardBody>
        );
    }
}

export default Card;
