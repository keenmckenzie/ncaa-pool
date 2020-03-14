import React from 'react';
import {Match} from './Match';

export const MatchList = ({matchList, weightClass}) => {
  console.log(matchList, weightClass)
  return (
    <>
      <h2 style={{backgroundColor: "grey"}}>{weightClass}</h2>
      {matchList.filter(match => match.weight == weightClass).map((match, index) => 
        <div style={{marginTop: "2%", border: '1px solid grey'}} key={index}> 
          <div style={{padding: '1%'}}>{match.wrestler1}</div>
          <div style={{padding: '1%'}}>{match.wrestler2}</div>
        </div>
      )}
    </>
  )
}