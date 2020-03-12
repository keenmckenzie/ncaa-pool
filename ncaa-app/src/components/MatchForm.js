import React from 'react';
import {useForm} from '../hooks/useForm';
import Axios from 'axios';
import { BASE_URL } from '../constants/Url';

// need a form for admin to enter a list of matches
//matchlist for dummy data until get request for list is set up
export const matchList = []

const MatchForm = () => {
  const [entry, handleChange, setEntry ] = useForm({
    weight: '',
    round: '',
    wrestler1: '',
    wrestler2: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${BASE_URL}/add-match`, entry)
    .then(res => console.log(res))
    .catch(err => console.log(err))

    setEntry({
      weight: '',
      round: '',
      wrestler1: '',
      wrestler2: ''
    })

    matchList.push(entry)
    console.log(matchList)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Weight Class</label>
        <input onChange={handleChange} placeholder="175" value={entry.weight} name="weight" type="text"></input>

        <label>Round</label>
        <input onChange={handleChange} placeholder="1" value={entry.round} name="round" type="text"></input>

        <label>Wrestler 1: </label>
        <input onChange={handleChange} placeholder="Charlie" value={entry.wrestler1} name="wrestler1" type="text"></input>

        <label>Wrestler 2: </label>
        <input onChange={handleChange} placeholder="Keenan" value={entry.wrestler2} name="wrestler2" type="text"></input>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default MatchForm;