import React, { useState } from 'react';
import { sortBy } from 'lodash';
import { Match } from './Match';




export const MatchList = ({matchList, weightClass}) => {
  const [ sort, setSort ] = useState('NONE')
  

  return (
    <>
      <div style={{display: 'flex', backgroundColor: 'grey', marginTop: '2%'}}>
        <h2 style={{display: 'inline-block', width: '25%'}}>Weight Class:</h2>
        <h2 style={{display: 'inline-block', width: '25%'}}>Wrestler 1:</h2>
        <h2 style={{display: 'inline-block', width: '25%'}}>Wrestler 2:</h2>
      </div>
      {matchList.map((match, index) => 
        <Match match={match} index={index} />
      )}
    </>
  )
}