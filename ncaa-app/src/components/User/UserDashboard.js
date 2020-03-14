import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useParams } from 'react-router-dom';
import {BASE_URL} from '../../Constants';


//props must come from login to get userId and direct to correct picks list
export const UserDashboard = (props) => {
  const [ picks, setPicks ] = useState([])
  const { userId } = useParams()

  useEffect(() => {
    axios
    .get(`${BASE_URL}/picks?user=${userId}`)
    .then(res => console.log(res))
  },[userId])

  return (
    <h1>Match List</h1>
  )
}