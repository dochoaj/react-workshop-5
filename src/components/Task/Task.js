import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

import './Task.css';

const taskSource = {
  beginDrag(props) {
    return {
      id: props.id,
      stage: props.stage
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Task extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;

    return connectDragSource(
      <div className="Task-container" style={{opacity: isDragging ? 0.5 : 1}}>
        <div className="Task-content">
          <div className="Task-title">
            { this.props.title }
          </div>
          <div className="Task-description">
            { this.props.description }
          </div>
        </div>
      </div>
    );
  }
}

export default DragSource('TASK', taskSource, collect)(Task);