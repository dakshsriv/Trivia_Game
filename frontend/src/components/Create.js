import React, { useState } from 'react'
import axios from 'axios';

function Create(props) {
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState("");
  const [responses, setResponses] = useState(["", "", "", ""]);
  const [category, setCategory] = useState("");
  const [chooseRightAnswer, setChooseRightAnswer] = useState(false);

  const aidList = [0,1,2,3];

  function updateResponse(event, index) {
    const preResponses = responses;
    preResponses[index] = event.target.value
    setResponses(preResponses);
  }

  function submitForm() {
    const requestParams = {"name": name, "answer": answer, "responses": responses, "category": category};
    console.log(requestParams)
    if (answer !== "") {
    axios.post("http://127.0.0.1:8000/api/", requestParams).then(res => console.log(res.data));
    return props.callBackFunction();
  }
    else {
      setChooseRightAnswer(true)
    }
  }

  return(
    <div>
      <form onSubmit={submitForm}>
        {console.log(name, answer, responses, category)}
        <input type="Text" onChange={(event) => setName(event.target.value)} value={name} placeholder="Question name" required/>
        {aidList.map((index) => 
          <div key={index}>
            <input  type="text"
            placeholder={["Response", (parseInt(index)+1).toString()].join(" ")}
            onChange={(event) => updateResponse(event, index)} required
            />
            <button type="button" onClick={() => {setAnswer(responses[index]);setChooseRightAnswer(false)}} required>Correct Answer</button>
          </div>
        )}
        {chooseRightAnswer ? <p style={{"color":"red"}}>Choose a correct answer</p> : null}
        <select size="4" value={category} onChange={(event) => setCategory(event.target.value)} required>
          {props.categories.map(cs => <option key={cs} value={cs}> {cs} </option> )}
        </select>  
        <button type="button" onClick={() => submitForm()}>Submit</button>
      </form>
    </div>)   
}

export default Create