import React, { useState } from 'react';
import { sortBy } from 'lodash';
import { Match } from './Match';


const sorts = {
  none: list => list,
  weight: list => sortBy(list, 'weight'),
  wrestler1: list => sortBy(list, 'wrestler_1'),
  wrestler2: list => sortBy(list, 'wrestler_2') 
}



export const MatchList = ({matchList, weightClass}) => {
  const [ sort, setSort ] = useState('none')

  const sortFunction = sorts[sort]
  const sortedList = sortFunction(matchList)

  return (
    <>
      <div style={{display: 'flex', backgroundColor: 'grey', marginTop: '2%'}}>
        <div style={{width: '25%'}} onClick={() => {setSort('weight')}} >
          <h2>Weight Class:</h2>
        </div>
        <div style={{width: '25%'}} onClick={() => {setSort('wrestler1')}}>
          <h2>Wrestler 1:</h2>
        </div>
        <div style={{width: '25%'}} onClick={() => {setSort('wrestler2')}}>
          <h2>Wrestler 2:</h2>
        </div>
      </div>
      {sortedList.map((match, index) => 
        <Match match={match} index={index} />
      )}
    </>
  )
}