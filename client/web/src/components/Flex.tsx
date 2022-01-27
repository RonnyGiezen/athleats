import React from 'react';
import './Flex.css';

class Flex extends React.Component<any, any>{
    render() {
        return (
            <div className="flex">
                {this.props.children}
            </div>
        );
    }
}

export default Flex;
