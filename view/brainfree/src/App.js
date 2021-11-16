import React  from 'react';
import './App.css';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import useToken from './useToken';



function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <Router>
        <Routes>
          <Route path='Dashboard' element={<Dashboard/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;