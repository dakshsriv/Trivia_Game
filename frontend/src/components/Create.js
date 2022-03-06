import {useState, useEffect} from 'react';
import axios from 'axios';

function Create(props) {
  const [gameName, setGameName] = useState("")
  const [today, setToday] = useState("")

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
        <input value={gameName} 
        style={{"height":"80px", "width":"99vw", "color": "black", "fontSize":"60px", "textAlign":"center"}} 
        onChange={(event) => setGameName(event.target.value)}
        placeholder="Game Title"
        />
        
      </form>
    </div>
  )
}

export default Create