import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Cover from './components/Cover';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Cover />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
        {/* add a home page */}
      </Routes>
    </Router>
  );
};

export default App;
