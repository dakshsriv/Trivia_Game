import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useTimer } from 'react-timer-hook';
import { Link } from 'react-router-dom';

function Game(props) {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(questions[0]);
  const requestStr = ["http://localhost:8000/api/games/","xG7xvlI"].join("");
  const length = 7;

  useEffect(() => {
    if (loading) {
    axios.get(requestStr, {id:"xG7xvlI"}).then((response) =>         {
    setQuestions(response.data.questions);
    setQuestion(response.data.questions[0]);
    setLoading(false);
    });
    start();}})
  
  useEffect(() => {console.log(question)}, [question])
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isEndScreen, setIsEndScreen] = useState(false);
  const [loading, setLoading] = useState(true)
  const initTime = new Date();
  initTime.setSeconds(initTime.getSeconds() + length*10);
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
  console.log(expiryTimestamp)

  const checkAnswer = (response, answer) => {
    console.log("checking")
    console.log(response, answer, questions.length, questionIndex)
    if (response === answer) {   
      setCorrectAnswers(correctAnswers+1);          
    }
    var newIndex = questionIndex + 1;
    if (newIndex === questions.length) {
      setIsEndScreen(true);
      return
    }
    setQuestionIndex(newIndex);
    setQuestion(questions[questionIndex+1])
  }

  if (minutes === 0 && seconds === 0 && !isEndScreen) {
    setIsEndScreen(true);
  }

  return (
  <div>
    {props.point}
    {(!question && !loading) ? <div>No questions <Link to="/"><button onClick={props.callBackFunction}>Return to home</button></Link></div> : 
    <div>
      {isEndScreen ? 
    <div>
      You got {correctAnswers}/{questions.length} correct.
      <Link to="/"><button onClick={props.callBackFunction}>Return to home</button></Link>
  </div> : 
  <div>
      {loading ? <p>Loading...</p>: <div><div>
      <p>{question.name}</p>
      {question.responses.map(response => <button key={response} type="button" onClick={() => {checkAnswer(response, question.answer)}}>{response}</button>)}
      </div>
    <br/>
    Correct Answers: {correctAnswers}
    <div>
    {(minutes.toString()).padStart(2, "0")}:{(seconds.toString()).padStart(2, "0")}
    </div></div>}
      
    </div>}
    </div>} 
  </div>) 
}

export default Game;