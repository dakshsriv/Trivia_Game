import React, { useState, useEffect} from 'react';

function Game(props) {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState(props.questions[questionIndex]);
  const [isEndScreen, setIsEndScreen] = useState(false);
  const [timer, setTimer] = useState(props.questions.length * 4);
  const [counter, setCounter] = useState(0);
  const length = props.questions.length;

  useEffect (() => 
  {
     startTimer()
  }, [])

  const startTimer = () => {
    setCounter(setInterval(function() {setTimer(timer - 1)}, 1000));
  }
      
  const checkAnswer = (response, answer) => {
    console.log(response, answer, length)
    if (response === answer) {              
      setCorrectAnswers(correctAnswers + 1);
    }
    var newIndex = questionIndex + 1;
    setQuestionIndex(newIndex);
    setQuestion(props.questions[questionIndex+1])
    
    if (questionIndex+1 === length) {
      setIsEndScreen(true);
    }
  }

  return (
  <div>
    {console.log(timer)}
    {isEndScreen ? 
    <div>
      You got {correctAnswers}/{length} correct.
      <button onClick={props.callBackFunction}>Return to home</button>
  </div> : 
  <div>
      <div key={question.id}>
      <p>{question.name}</p>
      {question.responses.map(response => <button onClick={() => {console.log(question);checkAnswer(response, question.answer, props.questions.length)}}>{response}</button>)}
      </div>
    <br/>
    Correct Answers: {correctAnswers}
    Time: {timer}
    Fix the timer!
    </div>}
  </div>)
}

export default Game;