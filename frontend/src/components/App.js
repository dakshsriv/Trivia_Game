import React, {useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';

const makeid = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}


function App(props) {
  const [loading, setLoading] = useState(true);
  const [requested, setRequested] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isCreate, setIsCreate] = useState("");
  const [categorySend, setCategorySend] = useState("");

  useEffect(() => {
    if (!requested) {
      axios.get("http://localhost:8000/api/categories/").then((response) => {console.log(response.data);setCategories(response.data);});
      setRequested(true);setLoading(false);}},[requested])

  function handleChange(event) {setCategorySend(event.target.value)}

  return(
  <div>
    {loading ? <div>Loading...</div>: 
    <div>
      {(isCreate) ? <Create categories={categories} callBackFunction={() => setIsCreate(false)}/> : 
        <button onClick={(event) => setIsCreate(true)}>Create question</button>}
      <select value={categorySend} onChange={handleChange}>
        {categories.map(category => <option key={category} value={category}>{category}</option>)}
      </select>
      <button onClick={() => props.callBackFunction(makeid(7), categorySend)}>Create link</button>
    </div>} 
  </div>);
  
}

export default App;
