import React, {useState} from 'react';



const LoginForm = () => {
  const [ user, setUser ] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setUser({[e.target.name]: e.target.value})
    console.log(user)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.
  }

  <form onSubmit={handleSubmit}>
    <label htmlFor="login">Username: </label>
    <input type='text' placeholder="Username" onChange={handleChange} value={user.username}/>
    <label htmlFor="login">Password: </label>
    <input type='text' placeholder="Password" onChange={handleChange} value={user.password}/>
    <button type="submit">Login</button>
  </form>
}

export default LoginForm
