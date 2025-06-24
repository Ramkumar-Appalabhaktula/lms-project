import React, { useState } from 'react';
import axios from 'axios';
import './ManagerLogin.css'; // Ensure this file exists in src/components/Manager

const ManagerLogin = () => {
  const [managerData, setManagerData] = useState({ managerId: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formError, setFormError] = useState('');
  const [showAddTrainer, setShowAddTrainer] = useState(false);
  const [trainerData, setTrainerData] = useState({
    name: '',
    email: '',
    trainerId: '',
    course: '',
    subject: '',
    role: 'Trainer',
    status: 'Active',
  });
  const [trainerRegistered, setTrainerRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const managerId = 2; // Example managerId, replace with dynamic value if needed

  const API_BASE_URL = 'http://localhost:8080/api';

  const handleManagerChange = (e) => {
    const { name, value } = e.target;
    setManagerData({ ...managerData, [name]: value });
  };

  const handleManagerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/managers/login`, managerData);
      if (response.data) {
        setIsLoggedIn(true);
        setFormError('');
      }
    } catch (error) {
      setFormError('Invalid managerId or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleTrainerChange = (e) => {
    const { name, value } = e.target;
    setTrainerData({ ...trainerData, [name]: value });
  };

  const handleTrainerSubmit = async (e) => {
    e.preventDefault();
    const { name, email, trainerId, course, subject } = trainerData;

    if (!name || !email || !trainerId || !course || !subject) {
      setFormError('Please fill out all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const trainerPayload = { name, email, trainerId, course, subject, role: trainerData.role, status: trainerData.status };
      const response = await axios.post(`${API_BASE_URL}/trainers/register/${managerId}`, trainerPayload);
      console.log('Trainer registered:', response.data);
      setTrainerData({
        name: '',
        email: '',
        trainerId: '',
        course: '',
        subject: '',
        role: 'Trainer',
        status: 'Active',
      });
      setShowAddTrainer(false);
      setTrainerRegistered(true);
      setFormError('');
    } catch (error) {
      setFormError(error.response?.data?.message || 'Failed to register trainer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manager-login-container">
      {!isLoggedIn ? (
        <form onSubmit={handleManagerSubmit} className="manager-form">
          <h2>Manager Login</h2>
          <div>
            <label>Manager ID:</label>
            <input
              type="text"
              name="managerId"
              value={managerData.managerId}
              onChange={handleManagerChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={managerData.password}
              onChange={handleManagerChange}
              required
            />
          </div>
          {formError && <p className="error">{formError}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      ) : (
        <div>
          <h2>Welcome, Manager!</h2>
          <button onClick={() => setShowAddTrainer(true)}>Add Trainer</button>
          {trainerRegistered && <p>Trainer registered successfully!</p>}
          {showAddTrainer && (
            <form onSubmit={handleTrainerSubmit} className="trainer-form">
              <h3>Add Trainer</h3>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={trainerData.name}
                  onChange={handleTrainerChange}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={trainerData.email}
                  onChange={handleTrainerChange}
                  required
                />
              </div>
              <div>
                <label>Trainer ID:</label>
                <input
                  type="text"
                  name="trainerId"
                  value={trainerData.trainerId}
                  onChange={handleTrainerChange}
                  required
                />
              </div>
              <div>
                <label>Course:</label>
                <input
                  type="text"
                  name="course"
                  value={trainerData.course}
                  onChange={handleTrainerChange}
                  required
                />
              </div>
              <div>
                <label>Subject:</label>
                <input
                  type="text"
                  name="subject"
                  value={trainerData.subject}
                  onChange={handleTrainerChange}
                  required
                />
              </div>
              <div>
                <label>Role:</label>
                <select name="role" value={trainerData.role} onChange={handleTrainerChange} disabled>
                  <option value="Trainer">Trainer</option>
                </select>
              </div>
              <div>
                <label>Status:</label>
                <select name="status" value={trainerData.status} onChange={handleTrainerChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              {formError && <p className="error">{formError}</p>}
              <button type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register Trainer'}
              </button>
              <button type="button" onClick={() => setShowAddTrainer(false)}>Cancel</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ManagerLogin;