import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useTimer } from 'react-timer-hook';
import { useParams, Link } from 'react-router-dom'

function Game(props) {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(questions[0]);
  const { gameLink } = useParams();
  const requestStr = ["http://localhost:8000/api/games/",gameLink].join("");
  const [length, setLength] = useState(7);
  const [username, setUsername] = useState("");
  const [isSendScreen, setIsSendScreen] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isEndScreen, setIsEndScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expiryTime, setExpiryTime] = useState(0);
  const initTime = new Date();
  const prepTime = Date.parse(initTime);
  initTime.setSeconds(initTime.getSeconds() + length*10);
  const expiryTimestamp = initTime


  
  function sendAnswer() {
    const sendDict = {"_id": username, "score": correctAnswers, "total":questions.length}
    console.log("reached")
    axios.post("http://localhost:8000/api/players/", sendDict).then(res => {
      if (res.data !== "Name exists") {setIsEndScreen(true);setIsSendScreen(false);}
    });
  }

  useEffect(() => {
    if (loading) {
    axios.get(requestStr, {id:gameLink}).then((response) => {

    if (response.data !== null) {
    setQuestions(response.data.questions);
    setQuestion(response.data.questions[0]);
    setLength(response.data.questions.length);
    setLoading(false);
    setExpiryTime(response.data.expiryTime) }
    else {
      setLoading(false)
    }
    });
    start();}})

  useEffect(() => {if (username !== "") {sendAnswer();}}, [isEndScreen])


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
    console.log(response, answer, length, questionIndex)
    if (response === answer) {   
      setCorrectAnswers(correctAnswers+1);          
    }
    var newIndex = questionIndex + 1;
    if (newIndex === length) {
      setIsSendScreen(true);
      return
    }
    setQuestionIndex(newIndex);
    setQuestion(questions[questionIndex+1])
  }

  if (minutes === 0 && seconds === 0 && !isSendScreen) {
    setIsSendScreen(true);
  }

  //<input value={username} onChange={(event) => setUsername(event.target.value)}/><button onClick={() => {setIsSetUp(true)}}>Submit</button>

  return (
  <div>
    {props.point}
    {(!question && !loading) ? <div>No questions <Link to="/"><button onClick={props.callBackFunction}>Return to home</button></Link></div> : 
    <div>
      {isSendScreen ? <div><input value={username} onChange={(event) => setUsername(event.target.value)}/><button onClick={sendAnswer}>Submit</button></div>: 
      <div>{isEndScreen ? 
        <div>
          You got {correctAnswers}/{length} correct.
          <Link to="/"><button onClick={props.callBackFunction}>Return to home</button></Link>
      </div> : 
      <div>
          {loading ? <p>Loading...</p>: <div>
            {(expiryTime < prepTime) ? <div>Expired, {expiryTime}, {prepTime}</div>: 
            <div>
            <p>{question.name}</p>
            {question.responses.map(response => <button key={response} type="button" onClick={() => {checkAnswer(response, question.answer)}}>{response}</button>)}
            <br/>
            Correct Answers: {correctAnswers}
            {(minutes.toString()).padStart(2, "0")}:{(seconds.toString()).padStart(2, "0")}
            </div>}
        </div>}
          
        </div>}</div>}
    </div>} 
  </div>) 
}

export default Game;