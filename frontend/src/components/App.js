import React, { Component } from 'react';
import EntryList from './EntryList';
import Create from './Create';
import Update from './Update';
import axios from 'axios';

class App extends Component {
  state = {isCreate: false, isUpdate: false, updateID: false, requested: false, entries: [], deleteCount: 0, runningEntry: {}};

  toggleIsCreate = () => {
    this.setState({isCreate : !this.state.isCreate});
    this.setState({requested: false});
  }

  getEntries = () => {
    if (!this.state.requested) { 
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/'
      })
      .then(response => {
        this.setState({entries: response.data});
        console.log("Entries is: ", this.state.entries);
        this.setState({requested: true});
      }) }}

  

  deleteEntry = (id) => {
    const originPrep = ["http://127.0.0.1:8000/api/", id];
    const origin = originPrep.join('');
    axios.delete(origin);
    this.setState({deleteCount: this.state.deleteCount+1});
    this.setState({requested: false});
  }

  setIsUpdate = (id) => {
    console.log("setIsUPdate reached");
    this.setState({isUpdate: !this.state.isUpdate});
    console.log(this.state.isUpdate)
    this.setState({updateID : id});
    const origin = ["http://127.0.0.1:8000/api/", id]
    axios.get(origin.join('')).then(res => this.setState({runningEntry:res.data}));
    this.setState({requested: false});
  }

  render() {
    this.getEntries();
    return(
    <div>
      <p className='topHeader'>Life of Trivia</p>
      {(this.state.isUpdate && !this.state.isCreate) ? <Update entry={this.state.runningEntry} id={this.state.updateID} callBackFunction={this.setIsUpdate}/>: null}
      {(this.state.isCreate && !this.state.isUpdate) ? <Create callBackFunction={this.toggleIsCreate}/>: null}
      {(!this.state.isCreate && !this.state.isUpdate) ? <EntryList entries={this.state.entries} sendDelete={this.deleteEntry} sendUpdate={this.setIsUpdate} sendCreate={this.toggleIsCreate}/> : null}
    </div>);
  }
}

export default App;
