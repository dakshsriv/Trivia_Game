import React, { useState} from 'react';

function Game(props) {
    const [correctAnswers, setCorrectAnswers] = useState(0);
    
    //const [question, setQuestion] = useState(Object.keys(props.questions)[questionIndex]);
    //const [questionData, setQuestionData] = useState(Object.values(props.questions)[questionIndex]);

    function checkAnswer(response, answer, length){
        console.log(response, answer, length)
        if (response === answer && correctAnswers < length) {
            setCorrectAnswers(correctAnswers + 1)
        }
    }

    return (
    <div>
        {props.questions.map((question) => <div key={question.id}>
            <p>{question.name}</p>
            {question.responses.map(response => <button onClick={() => checkAnswer(response, question.answer, props.questions.length)}>{response}</button>)}
            </div>)}
        <br/>
        Correct Answers: {correctAnswers}
    </div>)
}

export default Game;