import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useTimer } from 'react-timer-hook';
import { Link } from 'react-router-dom';

function Game(props) {
  console.log("Category is: ", props.category)

  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(questions[0]);
  const requestStr = ["http://localhost:8000/api/",props.category].join("")
  useEffect(() => {axios.get(requestStr, {category:props.category}).then((response) => {console.log(response.data);setQuestions(response.data);setQuestion(response.data[0]);setLoading(false)});start()}, [])
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isEndScreen, setIsEndScreen] = useState(false);
  const [loading, setLoading] = useState(true)
  const totalTime = props.questions*10//props.questions.length;
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