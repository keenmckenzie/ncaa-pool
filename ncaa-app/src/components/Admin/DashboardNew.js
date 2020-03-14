
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, weightClasses } from '../../Constants'
import { MatchForm } from './MatchForm';
import { MatchList } from './MatchList';

// match list needs to retrieve the matches from the backend, and display a list of matchups
    // matchups will be grouped by conference
// user should be able to select their winner
// can store list of chosen winners and corresponding round in backend, then check 
// will store a separate list of actual winners, updated by admin, then will check selection for each user against actual

export const DashboardNew = () => {
  const [ matchList, setMatchList ] = useState([])
  const [ picks, setPicks ] = useState([])
  
  useEffect(() => {
    //to retrieve user pics - need to be moved to a user dashboard
    axios
    .get(`${BASE_URL}/picks?user=keenan.mckenzie`)
    .then(res => console.log(res))

    axios
    .get(`${BASE_URL}/matches`)
    .then(res => setMatchList(res.data))
    }, [])

  return (
    <>
      <MatchForm setMatchList={setMatchList} matchList={matchList} />
      <MatchList matchList={matchList} />
    </>
  )
}