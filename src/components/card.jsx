import React from 'react';

class Card extends React.Component {
    render() {
        const { color, word, turned, onClick } = this.props;

        return (
            <div
                className='card'
                style={{
                    backgroundColor: turned ? color : 'white',
                    color: turned && color === '#2d2d2d' ? 'white' : 'black',
                }}
                onClick={() => onClick(word)}
            >
                {word}
            </div>
        );
    }
}

export default Card;
