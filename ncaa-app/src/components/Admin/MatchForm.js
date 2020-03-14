import React from 'react';
import {useForm} from '../../hooks/useForm';
import Axios from 'axios';
import { BASE_URL, weightClasses } from '../../Constants';

// Form for admin to enter matches

export const MatchForm = ({setMatchList, matchList}) => {
  const [entry, handleChange, setEntry ] = useForm({
    weight: '125',
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

    console.log(entry)
    setMatchList([...matchList, entry])
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="weight">Weight Class</label>
        <select name="weight" value={entry.weight} onChange={handleChange}>
          {weightClasses.map(weight => 
          <option value={`${weight}`}>{weight}</option>
          )}
        </select>

        <label htmlFor="round">Round</label>
        <input onChange={handleChange} placeholder="1" value={entry.round} name="round" type="text"></input>

        <label htmlFor="wrestler1">Wrestler 1: </label>
        <input onChange={handleChange} placeholder="Charlie" value={entry.wrestler1} name="wrestler1" type="text"></input>

        <label htmlFor="wrestler2">Wrestler 2: </label>
        <input onChange={handleChange} placeholder="Keenan" value={entry.wrestler2} name="wrestler2" type="text"></input>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}