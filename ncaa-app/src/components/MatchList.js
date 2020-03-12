import React from 'react';
import {matchList} from './MatchForm'; 
import {Match} from './Match';

export const MatchList = () => {
  return (
    matchList.map((match) => 
      <Match match={match} />
    )
  )
}