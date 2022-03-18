import React, {Component} from 'react';

class Game extends Component{
  state = {correctAnswers: 0, questionIndex: 0, question : this.props.questions[0], isEndScreen:false, len: this.props.questions.length, time:{}, seconds:5}
  
  timer = 0;

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer()
  }

  startTimer = () => {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
     
  secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  checkAnswer = (response, answer) => {
    console.log(response, answer, this.state.len)
    if (response === answer) {   
      this.setState({correctAnswers : this.state.correctAnswers + 1})           
    }
    var newIndex = this.state.questionIndex + 1;
    this.setState({questionIndex: newIndex, question: this.props.questions[this.state.questionIndex+1]})
    
    if (this.state.questionIndex+1 === this.state.len) {
      this.setState({isEndScreen: true})
    }
  }
  render() {
  return (
  <div>
    {console.log(this.timer)}
    {this.state.isEndScreen ? 
    <div>
      You got {this.state.correctAnswers}/{this.state.len} correct.
      <button onClick={this.props.callBackFunction}>Return to home</button>
  </div> : 
  <div>
      <div key={this.state.question.id}>
      <p>{this.state.question.name}</p>
      {this.state.question.responses.map(response => <button onClick={() => {console.log(this.state.question);this.checkAnswer(response, this.state.question.answer, this.props.questions.length)}}>{response}</button>)}
      </div>
    <br/>
    Correct Answers: {this.state.correctAnswers}
    Time: {this.timer}
    Fix the timer!
    </div>}
  </div>) }
}

export default Game;