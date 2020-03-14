import React from 'react';

export const Match = ({match, index}) => {
  return (
    <div style={{display: 'flex', border: '1px solid grey'}} key={index}>
      <span style={{display: "inline-block", padding: "2% 0", width: '25%'}}><strong>Weight Class: </strong>{match.weight}</span>
      <span style={{display: "inline-block", padding: "2% 0", width: '25%'}}><strong>Wrestler 1: </strong>{match.wrestler_1}</span>
      <span style={{display: "inline-block", padding: "2% 0", width: '25%'}}><strong>Wrestler 2: </strong>{match.wrestler_2}</span>
    </div>
  )
}