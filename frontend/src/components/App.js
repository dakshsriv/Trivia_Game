import React, { Component } from 'react';
import Game from './Game';
import Create from './Create'
import axios from 'axios';

class App extends Component {
  state = {questions: {}, requested: false, isPlaying: false, isCreate: false};

  getQuestions = () => {
    if (!this.state.requested) { 
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/mvp/'
      })
      .then(response => {
        this.setState({questions: response.data, requested: true});
      }) }}

  render() {
    this.getQuestions();
    return(
    <div>
      {(this.state.isPlaying && !this.state.isCreate) ? 
      <Game questions={this.state.questions} callBackFunction={() => this.setState({isPlaying: false, requested: false})}/>: 
      <div>{(this.state.isCreate && !this.state.isPlaying) ? <Create/> : 
        <div><button onClick={(event) => this.setState({isPlaying: true})}>Play game</button><button onClick={(event) => this.setState({isCreate: true})}>Create question</button></div>}</div>}
      
    </div>);
  }
}

export default App;
