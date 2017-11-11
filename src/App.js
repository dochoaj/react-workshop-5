import React, { Component } from 'react';
import uid from 'uid';

import Board from './components/Board/Board';
import './App.css';

class App extends Component {
  state = {
    stages: ['to do', 'doing', 'done', 'testing'],
    tasks: [
      { id: uid(), title: 'My awesome task', description: 'asdasdasdasd', stage: 'to do' }
    ]
  }

  addStage = (stage) => {
    this.setState({
      stages: [...this.state.stages, stage]
    });
  }

  addTask = (task) => {
    task.id = uid();

    this.setState({
      tasks: [...this.state.tasks, task]
    });
  }

  takeTask = (id, stage) => {
    const shallowTasks = [...this.state.tasks];
    const taskIndex = shallowTasks.findIndex( el => el.id === id);
    shallowTasks[taskIndex].stage = stage;

    this.setState({...this.state, tasks: shallowTasks});
  }

  render() {
    return (
      <div className="App">
        <Board 
          stages={this.state.stages}
          tasks={this.state.tasks}
          addStage={this.addStage}
          addTask={this.addTask}
          takeTask={this.takeTask}
        />
      </div>
    );
  }
}

export default App;
