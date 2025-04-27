import React from 'react';

function LuchBreakText({name,}) {
  return (
    <div
      style={{
        transform: 'rotate(-90deg)',
        // wiidth:"1px"
        fontFamily: 'Roboto',
        justifyContent:"center",
        alignContent:"center",
        display:"flex",
        margin:"-22px -50px 10px -20px"
      }}>
      <pre>
        <p style={{fontSize: '26px'}}>{name}</p>
      </pre>
    </div>
  );
}



export default LuchBreakText;
