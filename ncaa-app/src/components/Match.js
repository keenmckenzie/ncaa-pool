import React from 'react';



export const Match = ({match}) => {
  return (
    <div style={{display: 'inline-block', padding: '2%'}}>
      <span>{match.wrestler1}</span>
      <span>{match.wrestler2}</span>
    </div>
  )
}