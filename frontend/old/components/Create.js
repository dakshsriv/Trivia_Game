import {useState, useEffect} from 'react';
import axios from 'axios';

function Create(props) {
  const questionTemplate = {"key":"1", "value":"", "TimeAllowed":"", "responses":["", "", "", ""]};

  const [gameName, setGameName] = useState("");
  const [today, setToday] = useState("");
  const [questions, setQuestions] = useState([questionTemplate])
  const [currentQuestion, setCurrentQuestion] = useState() 
  const [answers, setAnswers] = useState([{"":""}]);
  const [numberQuestions, setNumberQuestions] = useState(1);

  useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    setToday(today);
  }, []);

  
  function submit(event) {
    event.preventDefault()
    axios({method: 'post',
           url:'http://127.0.0.1:8000/api/',
           data: {
            duration: 0,
            night: ""
          }
        }).then(() => {props.callBackFunction()})
  }

  function cancel() {
    props.callBackFunction();
  }

  return(
    <div>
      <form>
        <div style={{"display":"inline-block", "margin": "0px"}}><p style={{'fontSize': '5vw'}}>Game title:</p></div>
        <input value={gameName} 
        style={{ "width":"70vw", "color": "black", "fontSize":"60px", "textAlign":"center"}} 
        onChange={(event) => setGameName(event.target.value)}
        placeholder="Game Title"/>
        <div>
          {questions.map((question) => (<button key={question.key} type="button" onClick={() => setCurrentQuestion(question.key)}>{question.key}</button>))}
        </div>
        <input placeholder="Name of question" />
      </form>
    </div>
  )
}

export default Create