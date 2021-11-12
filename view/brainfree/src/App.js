import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Preferences from './components/Preferences/Preferences';

function App() {
  const [username, setToken] = useState();

  if(!username) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;