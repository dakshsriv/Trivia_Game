import React, { useState } from 'react'
import axios from 'axios'

function Create() {
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState("");
  const [responses, setResponses] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const [category, setCategory] = useState("");

  const aidList = [0,1,2,3];

  function updateResponse(event, index) {
    const preResponses = responses;
    preResponses[index] = event.target.value
    setResponses(preResponses);
  }

  function submitForm() {
    console.log('submit')
  }

  return(
    <div>
      <form onSubmit={submitForm}>
        {console.log(name, answer, responses, timer, category)}
        <input type="Text" onChange={(event) => setName(event.target.value)} value={name} placeholder="Question name" required/>
        {aidList.map((index) => 
          <div key={index}>
            <input  type="text"
            placeholder={["Response", (parseInt(index)+1).toString()].join(" ")}
            onChange={(event) => updateResponse(event, index)}
            />
            <button onClick={(index) => setAnswer(responses[index])}>Correct Answer</button>
          </div>
        )}
        How long for the question:
        <input value={timer}type="number" onChange={(event) => setTimer(event.target.value)}/>
        <select name="Category" size="4"
        value={category}
        onChange={(event) => setCategory(event.target.value)}>  
  <option> World </option>  
  <option> Sports </option>  
  <option> Disney </option>  
  <option> Canada </option>  
    </select>  
        <input type="submit" name="Submit"/>
      </form>
    </div>)   
}

export default Create