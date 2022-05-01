import React, {useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';

const makeId = (length) => {
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
  const [expireTime, setExpireTime] = useState("");
  const [expireTimeFin, setExpireTimeFin] = useState("");

  useEffect(() => {
    if (!requested) {
      axios.get("http://localhost:8000/api/categories/").then((response) => {console.log(response.data);setCategories(response.data);});
      setRequested(true);setLoading(false);}},[requested])

  function handleChange(event) {setCategorySend(event.target.value)}

  useEffect(() => {
    const x = new Date(expireTime);
    const ts = Date.parse(x);
    console.log(x, ts);
    if (isNaN(ts) === false) {
    setExpireTimeFin(ts); }
  }, [expireTime])

  return(
  <div>
    {loading ? <div>Loading...</div>: 
    <div>
      {(isCreate) ? <Create categories={categories} callBackFunction={() => setIsCreate(false)}/> : 
        <button onClick={(event) => setIsCreate(true)}>Create question</button>}
      <select value={categorySend} onChange={handleChange}>
        {categories.map(category => <option key={category} value={category}>{category}</option>)}
      </select>
      <input type="text" onChange={(event) => setExpireTime(event.target.value)}/>
      <button onClick={() => {const requestStr = ["http://localhost:8000/api/",categorySend].join("");axios.get(requestStr, {category:categorySend}).then((res) => {
        const requestParams = {"id":makeId(7),"expiryTime":expireTimeFin,"questions":res.data};
        console.log(requestParams);
        axios.post("http://localhost:8000/api/games/", requestParams).then(res => console.log(res.data));} //Finish this
      )}}>Create link</button>
    </div>} 
  </div>);
  
}

export default App;
