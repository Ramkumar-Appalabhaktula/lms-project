import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StudentLogin() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');

  // Handle input changes for email and student ID
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'studentId') setStudentId(value);
  };

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validate that both email and student ID are filled out
    if (email && studentId) {
      navigate('/Student-details'); // Navigate to the Student Details page
    } else {
      alert('Please fill in both email and student ID!'); // Show an alert if fields are missing
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleLogin}>

        <h2>Student Email:</h2>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          className="form-control mb-3"
          placeholder="Enter the Student email"
        />

        <h2>Student ID:</h2>
        <input
          type="number"
          name="studentId"
          value={studentId}
          onChange={handleInputChange}
          className="form-control mb-3"
          placeholder="Enter the Student Id"
        />

        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
