import React from 'react';

class TestComponent extends React.Component {

    onClick = () => {
        if(this.props ) {
            this.props.onClick(this.props.value);
        }
    }

    render() {
        return (
            <div>
                <p>Value: {this.props.value} </p>
                <button onClick = {this.onClick}>Test Button</button>
            </div>
        );
    }
}

export default TestComponent;