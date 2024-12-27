import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Cover from './components/Cover';
import Dashboard from './components/Dashboard';
import SearchForm from './components/SearchForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Cover />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/search" element={<SearchForm />} /> 
      </Routes>
    </Router>
  );
};

export default App;
