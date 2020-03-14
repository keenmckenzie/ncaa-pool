import React, { useState } from 'react';


export const useLocalStorage = (key, value) => {
  const [ userId, setUserId ] = useState(() =>
      localStorage.getItem(key) ?
      JSON.parse(localStorage.getItem(key)) :
      value
    )

    const setValue = (value) => {
      setUserId(value)
      localStorage.setItem(key,JSON.stringify(value))
    }

    return [userId, setValue]
}
