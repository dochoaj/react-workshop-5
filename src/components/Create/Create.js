import React, { Component } from 'react';
import './Create.css'; 

class Create extends Component {
  render() {
    return (
      <div 
        className="Create-container"
        onClick={this.onCreate}
      >
        <div className="Create-content">
          {this.props.text}
        </div>
      </div>
    );
  }

  onCreate = (event) => {
    event.preventDefault();
    this.props.onClick();
  }
}

export default Create;