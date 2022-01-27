import React from 'react';
import './ImageButton.css';

class ImageButton extends React.Component<any, any>{
    render() {
        return (
            <a className="container"
               href={this.props.href}
               target={this.props.target}>
                <div className="text" style={{color: this.props.color, background: this.props.background}}>
                    {this.props.children}
                </div>
                <div className="annotation"
                     style={{
                         backgroundImage: `linear-gradient(to bottom, ${this.props.background} 50%, ${this.props.backgroundLight} 50%)`,
                         color: this.props.color}}>
                    {this.props.annotation}
                </div>
            </a>
        );
    }
}

export default ImageButton;
