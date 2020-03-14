import React from 'react';
import { Route } from 'react-router-dom';
import { Dashboard } from './components/Admin/Dashboard';
import { NavBar } from './components/Nav'
import LoginForm from './components/Login/LoginForm';
import RegistrationForm from './components/Login/Registration';

function App() {



  return (
    <div className="App">
      <NavBar />
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/">
        <RegistrationForm />
      </Route>
      <Route path="/login">
        <LoginForm />
      </Route>
    </div>
  );
}

export default App;
