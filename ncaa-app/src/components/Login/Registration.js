import React from 'react';
import { Form } from '../Form';
import { useForm } from '../../hooks/useForm';
import { BASE_URL } from '../../Constants';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


const RegistrationForm = () => {
  const [ user, handleChange, setUser ] = useForm({
    username: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${BASE_URL}/add-user?userName=${user.username}&password=${user.password}`, {
      username: user.username,
      password: user.password
    })
    .then(response => {console.log(response)})
    .catch(err => {console.log(err)})

    setUser({
      username: '',
      password: ''
    })
  }

  return (
    <>
      <Form 
        user={user} 
        onChange={handleChange} 
        onSubmit={handleSubmit}
      />
      <NavLink to='/login'>Already registered? Log in.</NavLink>
    </>
  )
}

export default RegistrationForm
