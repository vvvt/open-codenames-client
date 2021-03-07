import React from 'react';
import colors from '../style/colors';

class Card extends React.Component {
    render() {
        const { type, word, turned, onClick } = this.props;

        return (
            <div
                className='card'
                style={{
                    background: turned ? colors[type] : 'rgba(255,255,255,0.2)',
                }}
                onClick={() => onClick(word)}
            >
                {word}
            </div>
        );
    }
}

export default Card;
