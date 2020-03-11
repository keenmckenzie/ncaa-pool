import React, {useState} from 'react';
import axios from 'axios';


const RegistrationForm = () => {
  const [ user, setUser ] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
    console.log(user)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`https://sheltered-shelf-78103.herokuapp.com/add-user?userName=${user.username}&password=${user.password}`, {
      username: user.username,
      password: user.password
    })
    .then(response => {console.log(response)})
    .catch(err => {console.log(err)})
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="login">Username: </label>
      <input type='text' placeholder="Username" name='username' onChange={handleChange} value={user.username}/>
      <label htmlFor="login">Password: </label>
      <input type='text' placeholder="Password" name='password' onChange={handleChange} value={user.password}/>
      <button type="submit">Register</button>
    </form>
    )
}

export default RegistrationForm
