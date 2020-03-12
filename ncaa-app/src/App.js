import React from 'react';
import RegistrationForm from './components/Registration'
import MatchForm from './components/MatchForm'
import {MatchList} from './components/MatchList'

function App() {
  return (
    <div className="App">
      <RegistrationForm />
      <MatchForm />
      <MatchList />
    </div>
  );
}

export default App;
