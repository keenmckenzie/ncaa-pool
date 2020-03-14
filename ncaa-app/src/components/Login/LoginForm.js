import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Form } from '../Form';
import { useForm } from '../../hooks/useForm';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { BASE_URL } from '../../Constants';


const userId = 1

const LoginForm = () => {
  const [ user, handleChange] = useForm({
    username: '',
    password: ''
  });
  const [loginId, setLoginId ] = useState(userId) 
  //hardcoding one because login not working, this will change once I can access login endpoint
  //also will need to change routing after login for admin vs. user

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(history)
    history.push(`/${loginId}`)
    // axios
    //   // .get(`${BASE_URL}/authorize-user?userName=${user.username}&password=${user.password}`)
    //   // .then(res => console.log(res))
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
