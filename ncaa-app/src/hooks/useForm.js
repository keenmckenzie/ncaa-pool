import { useState } from 'react';

export const useForm = (initialValue) => {
  const [ user, setUser ] = useState(initialValue);
  
  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
    console.log(user)
  }

  return [user, handleChange, setUser]
}