import React from 'react';
import { NavLink } from 'react-router-dom';


export const NavBar = () => 
  <header style={{display: 'flex', justifyContent: 'flex-end'}}>
    <div style={{padding: '2%'}}>
      <NavLink style={{textDecoration: 'none', padding: '5%'}} to="/">Login</NavLink>
      <NavLink style={{textDecoration: 'none', padding: '5%'}} to="/dashboard">Dashboard</NavLink>
    </div>
  </header>

