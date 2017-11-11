import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import Task from '../Task/Task';
import EmptyTask from '../EmptyTask/EmptyTask';
import Create from '../Create/Create';
import './Stage.css';

const stageTarget = {
  drop(targetProps, monitor) {
    const item = monitor.getItem();

    if (targetProps.title != item.stage) {
      targetProps.takeTask(item.id, targetProps.title);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class Stage extends Component {
  state = {
    emptyTasks: [],
    canCreate: true,
  }

  render() {
    return this.props.connectDropTarget(
      <div className="Stage-container">
        <div className="Stage-content">
          <div className="Stage-title">
            { this.props.title }
          </div>
          <div className="Stage-tasks">
            {this.buildTasks()}
          </div>
        </div>
      </div>
    );
  }

  buildTasks() {
    const taskComponents = this.props.tasks.map((task) => {
      const { id, title, description, stage } = task;

      return (
        <Task
          key={id}
          id={id}
          title={title}
          description={description}
          stage={stage}
        />
      );
    });

    if (this.state.canCreate) {
      taskComponents.push(<Create text="Add Task" onClick={this.addEmptyTask} key='create' />);
    }

    if (this.state.emptyTasks) {
      taskComponents.push(this.state.emptyTasks);
    }

    return taskComponents;
  }

  addEmptyTask = () => {
    this.setState({
      emptyTasks: [...this.state.emptyTasks, this.buildEmptyTask()],
      canCreate: false,
    });
  }

  buildEmptyTask() {
    return (
      <EmptyTask
        key='empty'
        onSave={this.saveTask}
        onDiscard={this.discardTask}
      />
    );
  }

  saveTask = (task) => {
    this.setState({
      emptyTasks: [],
      canCreate: true,
    })

    task.stage = this.props.title;
    this.props.addTask(task);
  }

  discardTask = () => {
    this.setState({
      emptyTasks: [],
      canCreate: true,
    })
  }
}

export default DropTarget('TASK', stageTarget, collect)(Stage);