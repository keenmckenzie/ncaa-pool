import React from 'react';
import { Route } from 'react-router-dom';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { UserDashboard } from './components/User/UserDashboard';
import { NavBar } from './components/Nav'
import LoginForm from './components/Login/LoginForm';
import RegistrationForm from './components/Login/Registration';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/dashboard">
        <AdminDashboard />
      </Route>
      <Route exact path="/">
        <RegistrationForm />
      </Route>
      <Route exact path="/login">
        <LoginForm />
      </Route>
      <Route path="/:userId">
        <UserDashboard />
      </Route>
    </div>
  );
}

export default App;
