import {useState, useEffect} from 'react';
import axios from 'axios';

function Update(props) {
  const [duration, setDuration] = useState("");
  const [night, setNight] = useState("");
  const [today, setToday] = useState('');
  
  useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    setToday(today);
  }, []);

  function updateDuration(event) {
    event.preventDefault()
    setDuration(event.target.value);
    }

  function updateNight(event) {
    event.preventDefault();
    setNight(event.target.value);
  }
  
  function submit(event) {
    event.preventDefault();
    const originList = ['http://127.0.0.1:8000/api/', props.entry._id];
    const putAddr = originList.join('');
    axios({method: 'put',
           url: putAddr,
           data: {
            duration: duration,
            night: night
          }
        }).then(() => {props.callBackFunction("")})
  }

  function cancel() {
    console.log(props);
    props.callBackFunction("");
  }
  return(
    <div>
      <h1>Update an existing entry</h1>
      <div className="entryListBox" 
      style={{'width':'97vw', 'alignItems':'center', 'textAlign':'center'}}>
        <form onSubmit={submit}>
          <div>
            <div style={{'display':"inline-block"}}>
              <p className="bigTextSize" style={{'margin':'auto'}}> Hours you slept:</p>
            </div>
            <input value={duration} type="number" id='createDurationField' placeholder={props.entry.duration}onChange={updateDuration} 
            style={{'fontSize': '100px', 'width':'150px', 'backgroundColor':'white', 'color': 'black', 'margin': '20px'}} min={0} max={24} required/>
          </div>
          <div style={{'display':"inline-block"}}>
            <p className="bigTextSize" style={{'margin':'auto'}}>Which night:</p>
          </div>
          <input onChange={updateNight} type="date" id="night" name="night-selector" 
           style={{'fontSize': '35px', 'width':'300px', 'margin': '20px', 'alignItems':'center', 'justifyItems':'center'}} max={today} required/>
          <div>
            <input type="button" value="Cancel" onClick={() => cancel()} style={{'fontSize':'40px', 'marginRight':'10px'}}/>
            <input type="submit" value="Submit" style={{'fontSize':'40px'}}/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Update