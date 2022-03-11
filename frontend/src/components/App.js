import React, { Component } from 'react';
import Game from './Game'
import axios from 'axios';

class App extends Component {
  state = {questions: {}, requested: false, isPlaying: false};

  getQuestions = () => {
    if (!this.state.requested) { 
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/mvp/'
      })
      .then(response => {
        this.setState({questions: response.data, requested: true});
        console.log(this.state.isPlaying);
      }) }}

  render() {
    this.getQuestions();
    return(
    <div>
      {this.state.isPlaying ? <Game questions={this.state.questions} callBackFunction={() => this.setState({isPlaying: false, requested: false})}/>: <button onClick={(event) => this.setState({isPlaying: true})}>Play game</button>}
    </div>);
  }
}

export default App;
