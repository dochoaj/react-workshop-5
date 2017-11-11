import React, { Component } from 'react';
import './EmptyTask.css';

class EmptyTask extends Component {
  state = {
    title: '',
    description: ''
  }

  render() {
    return (
      <div className="EmptyTask-container">
        <div className="EmptyTask-content">
          <div className="EmptyTask-title">
            <input type="text" value={this.state.title} onChange={this.onTitleChange} />
          </div>
          <div className="EmptyTask-description">
            <textarea value={this.state.description} onChange={this.onDescriptionChange} />
          </div>
          <div className="EmptyTask-controls">
            <button onClick={this.onSaveClick}>Save</button>
            <button onClick={this.onDiscardClick}>Discard</button>
          </div>
        </div>
      </div>
    )
  }

  onTitleChange = (event) => {
    this.setState({
      title: event.target.value
    });
  }

  onDescriptionChange = (event) => {
    this.setState({
      description: event.target.value
    });
  }

  onSaveClick = (event) => {
    event.preventDefault();
    if (this.state.title && this.state.description) {
      this.props.onSave({ title: this.state.title, description: this.state.description });
    }
  }

  onDiscardClick = (event) => {
    event.preventDefault();
    this.props.onDiscard();
  }
}

export default EmptyTask;