import React, { useState } from 'react';
import axios from 'axios'; // to make HTTP requests (send data from form to backend)
import { useNavigate } from 'react-router-dom';  // to navigate between routes
import './Register.css'; 

const Register = () => {
  const [formData, setFormData] = useState({ // initially all empty fields
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const [message, setMessage] = useState(''); // store success message
  const [error, setError] = useState(''); // store error message
  const navigate = useNavigate(); // initialize useNavigate

  // handle changes in the input fields of the form
  const handleChange = (e) => { // takes event object 'e' as a param (contains name and value of input element)
    setFormData({
      ...formData, // spreads existing states so that it doesn't overwrite other fields, only update the one that changed
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => { // async fn because it involves making an HTTP request to the backend
    e.preventDefault(); // prevent reloading the page
    setMessage(''); // both messages are cleared
    setError('');
    try { // making POST request
      const response = await axios.post('http://localhost:5000/register', formData); // sends formData to backend API
      setMessage(response.data); // Show success message
      setFormData({ // resetting form fields
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
      });
    } catch (err) {
      setError(err.response?.data || 'Registration failed!'); // If the backend sends an error message in the response, that message is used, o.w, display 'registration failed!'
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Use navigate to redirect to the login page
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="register-input"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="register-input"
          />
          <button type="submit" className="register-button">Register</button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <p className="login-link">
          Already have an account? <button onClick={handleLoginRedirect} className="login-button">Login</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
