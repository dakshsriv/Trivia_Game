import Entry from './Entry';

function EntryList(props) {

  const prepareSendCreate = () => {
    console.log("Clicked")
    return props.sendCreate()
  }
    
  return(
  <div>
    <div className="entryListBox">
    <button className="createBox" onClick={() => prepareSendCreate()} >Create a new game</button>
    {props.entries.map((entry) => {return <Entry key={entry._id} id={entry._id} deleteEntry={props.sendDelete} updateCallBack={props.sendUpdate} entry={entry} />})}</div>
    
  </div>)
}

export default EntryList