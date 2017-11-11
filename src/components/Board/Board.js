import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Stage from '../Stage/Stage';
import EmptyStage from '../EmptyStage/EmptyStage';
import Create from '../Create/Create';
import './Board.css';

class Board extends Component {
  state = {
    emptyStages: [],
    canCreate: true,
  }

  render() {
    return(
      <div className="Board-container">
        {this.buildStages()}
      </div>
    );
  }

  buildStages() {
    const stages = this.props.stages.map((stage) => {
      return this.buildStage(stage);
    });

    if (this.state.canCreate) {
      stages.push(this.addStageComponent());
    }

    if (this.state.emptyStages) {
      stages.push(this.state.emptyStages);
    }

    return stages;
  }

  buildStage(stage) {
    return (
      <div key={stage} className="Board-column">
        <Stage
          title={stage}
          tasks={this.props.tasks.filter( t => t.stage === stage)}
          addTask={this.props.addTask}
          takeTask={this.props.takeTask}
        />
      </div>
    );
  }

  addStageComponent() {
    return (
      <div key='create' className="Board-column">
        <Create text="Add Stage" onClick={this.addEmptyStage} />
      </div>
    );
  }

  addEmptyStage = () => {
    this.setState({
      emptyStages: [...this.state.emptyStages, this.buildEmptyStage()],
      canCreate: false,
    });
  }

  buildEmptyStage() {
    return (
      <div key='empty' className="Board-column">
        <EmptyStage
          onSave={this.saveStage}
          onDiscard={this.discardStage}
        />
      </div>
    );
  }

  saveStage = (stage) => {
    this.setState({
      emptyStages: [],
      canCreate: true,
    });

    this.props.addStage(stage.title);
  }

  discardStage = () => {
    this.setState({
      emptyStages: [],
      canCreate: true,
    });
  }
}

export default DragDropContext(HTML5Backend)(Board);