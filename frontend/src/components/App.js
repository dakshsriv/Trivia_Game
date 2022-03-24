import React, { Component } from 'react';
import Game from './Game';
import Create from './Create';
import axios from 'axios';

const makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}


class App extends Component {
  state = {isCreate: false};

  render() {
    return(
    <div>
      {(this.state.isCreate) ? <Create callBackFunction={() => this.setState({isCreate: false})}/> : 
          <button onClick={(event) => this.setState({isCreate: true})}>Create question</button>}
      <button onClick={() => this.props.callBackFunction(makeid(7), "")}>Create link</button> 
    </div>);
  }
}

export default App;
