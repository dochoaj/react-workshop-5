import React, { Component } from 'react';
import './EmptyStage.css';

class EmptyStage extends Component {
  state = {
    title: ''
  }

  render() {
    return (
      <div className="EmptyStage-container">
        <div className="EmptyStage-content">
          <div className="EmptyStage-title">
            <input type="text" value={this.state.title} onChange={this.onTitleChange} />
          </div>
          <div className="EmptyStage-controls">
            <button onClick={this.onSaveClick}>Save</button>
            <button onClick={this.onDiscardClick}>Discard</button>
          </div>
        </div>
      </div>
    );
  }

  onTitleChange = (event) => {
    this.setState({
      title: event.target.value
    });
  }

  onSaveClick = (event) => {
    event.preventDefault();
    if (this.state.title) {
      this.props.onSave({ title: this.state.title });
    }
  }

  onDiscardClick = (event) => {
    event.preventDefault();
    this.props.onDiscard();
  }
}

export default EmptyStage;