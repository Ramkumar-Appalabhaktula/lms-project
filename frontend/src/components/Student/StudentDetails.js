import { Link } from 'react-router-dom';
import React from 'react';

// const handleLogin = (e) => {
//     e.preventDefault();
//     navigate('/Student-add-trainer'); // Navigate on form submit
//   };

export default function StudentDetails() {
  return (
    <div className="container mt-5">
      <h2>Student Details</h2>
      <table className="table">
        <tbody>
          <tr><td><Link to="/Student-add-trainer" className="btn btn-outline-primary" type="submit">Student Add Trainer</Link></td></tr>
          <tr><td><Link to="/Student-view-trainer" className="btn btn-outline-success">StudentView Trainer</Link></td></tr>
          <tr><td><Link to="/" className="btn btn-outline-danger">Logout</Link></td></tr>
        </tbody>
      </table>
    </div>
  );
}
