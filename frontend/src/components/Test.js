import React from 'react';

function Test(props) {
  console.log(props.point)
  return (
  <div>
    Webpage at point {props.point} has loaded. 
  </div>) 
}

export default Test;