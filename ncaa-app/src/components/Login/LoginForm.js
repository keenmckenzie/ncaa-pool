import React, {useState} from 'react';
import { Form } from '../Form';
import { useForm } from '../../hooks/useForm';


const LoginForm = () => {
  const [ user, handleChange] = useForm({
    username: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios. // need to create login request
  }

return (
  <Form 
    onSubmit={handleSubmit} 
    onChange={handleChange} 
    user={user}
  />
  )
}

export default LoginForm
