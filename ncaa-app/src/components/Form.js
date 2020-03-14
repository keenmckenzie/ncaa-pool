import React from 'react';


export const Form = ({user, onChange, onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="login">Username: </label>
      <input type='text' placeholder="Username" name='username' onChange={onChange} value={user.username}/>
      <label htmlFor="login">Password: </label>
      <input type='password' placeholder="Password" name='password' onChange={onChange} value={user.password}/>
      <button type="submit">Register</button>
    </form>
    )
}