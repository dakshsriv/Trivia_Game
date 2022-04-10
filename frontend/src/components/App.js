import React, {useState } from 'react';
import Create from './Create';

const makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}


function App(props) {
  const [isCreate, setIsCreate] = useState("");
  const [categorySend, setCategorySend] = useState("");
  return(
  <div>
    {(isCreate) ? <Create callBackFunction={() => setIsCreate(false)}/> : 
        <button onClick={(event) => setIsCreate(true)}>Create question</button>}
    <input value={categorySend} onChange={(event) => {setCategorySend(event.target.value);console.log(event.target.value)}}/>
    <button onClick={() => props.callBackFunction(makeid(7), categorySend)}>Create link</button> 
  </div>);
  
}

export default App;
