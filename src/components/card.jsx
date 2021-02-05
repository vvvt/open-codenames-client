import React from 'react';

class Card extends React.Component {
    state = {
        turned: false,
    };

    componentDidMount() {
        this.setState({ turned: this.props.turned });
    }

    handleClick = () => {
        this.setState({ turned: true });
    };

    render() {
        const { turned } = this.state;
        const { faction, word } = this.props;
        const color = this.props.faction;

        return (
            <div
                className='card'
                style={{
                    backgroundColor: turned ? color : 'white',
                    color: turned && faction === 3 ? 'white' : 'black',
                }}
                onClick={this.handleClick}
            >
                {word}
            </div>
        );
    }
}

export default Card;
