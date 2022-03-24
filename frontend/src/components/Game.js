import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useTimer } from 'react-timer-hook';

function Game(props) {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios.get("localhost:3000/api/").then(response => {setQuestions(response.data);setQuestion(response.data[0])});
  })
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState(props.questions[0]);
  const [isEndScreen, setIsEndScreen] = useState(false);
  const [len, setLen] = useState(props.questions.length);
  const totalTime = len*10//props.questions.length;
  const initTime = new Date();
  initTime.setSeconds(initTime.getSeconds() + totalTime);
  const [expiryTimestamp, setExpiryTimestamp] = useState(initTime);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called")
  });

  const checkAnswer = (response, answer) => {
    console.log(response, answer, len)
    if (response === answer) {   
      setCorrectAnswers(correctAnswers+1);          
    }
    var newIndex = questionIndex + 1;
    setQuestionIndex(newIndex);
    setQuestion(props.questions[questionIndex+1])

    
    if (questionIndex+1 === len) {
      setIsEndScreen(true)
    }
  }

  if (minutes === 0 && seconds === 0 && !isEndScreen) {
    setIsEndScreen(true);
  }

  return (
  <div>
    {!props.question ? <div>No questions <button onClick={props.callBackFunction}>Return to home</button></div> : 
    <div>
      {isEndScreen ? 
    <div>
      You got {correctAnswers}/{len} correct.
      <button onClick={props.callBackFunction}>Return to home</button>
  </div> : 
  <div>
      <div key={question.id}>
      <p>{question.name}</p>
      {question.responses.map(response => <button onClick={() => {console.log(question);checkAnswer(response, question.answer, props.questions.length)}}>{response}</button>)}
      </div>
    <br/>
    Correct Answers: {correctAnswers}
    <div>
    {(minutes.toString()).padStart(2, "0")}:{(seconds.toString()).padStart(2, "0")}
    </div>
    </div>}
    </div>} 
  </div>) 
}

export default Game;