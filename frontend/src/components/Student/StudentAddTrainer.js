import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap'; // Importing the Dropdown component

export default function StudentAddTrainer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    id: '',
    course: '',
  });
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setFormData({ ...formData, course });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.id && formData.course) {
      window.alert('Student Registered Successfully!');
      console.log('Registered Student:', formData);
      navigate('/student-view-trainer', { state: { student: formData } });
    } else {
      window.alert('Please fill out all fields!');
    }
  };

  const CourseDetails = ({ courseName, frontend, backend }) => (
    <div className="card p-3">
      <h2>{courseName}</h2>
      <h4>Frontend Technologies:</h4>
      <ul>
        {frontend.map((tech, i) => (
          <li key={i}>{tech}</li>
        ))}
      </ul>
      <h4>Backend Technologies:</h4>
      <ul>
        {backend.map((tech, i) => (
          <li key={i}>{tech}</li>
        ))}
      </ul>
    </div>
  );

  // Navigate back to the previous page
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="container mt-5">
       <h1 className="mb-4 text-center">Student Add Trainer</h1> 
      <form onSubmit={handleRegister}>
        <h2>Student Name:</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="form-control mb-3"
          placeholder="Enter the Student name"
        />

        <h2>Student Email:</h2>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="form-control mb-3"
          placeholder="Enter the Student email"
        />

        <h2>Student ID:</h2>
        <input
          type="number"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          className="form-control mb-3"
          placeholder="Enter the Student ID"
        />

        {/* Course Dropdown using React Bootstrap's Dropdown component */}
        <div className="container mt-4">
          <Dropdown className="mb-4">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {selectedCourse ? selectedCourse : 'Select Course'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleCourseClick('Java Full Stack')}>
                Java Full Stack
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleCourseClick('Python Full Stack')}>
                Python Full Stack
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleCourseClick('AI/ML Full Stack')}>
                AI/ML Full Stack
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Show course details based on selection */}
          {selectedCourse === 'Java Full Stack' && (
            <CourseDetails
              courseName="JAVA FULL STACK"
              frontend={['HTML', 'CSS', 'React']}
              backend={['Java', 'Spring Boot']}
            />
          )}
          {selectedCourse === 'Python Full Stack' && (
            <CourseDetails
              courseName="PYTHON FULL STACK"
              frontend={['HTML', 'CSS', 'React']}
              backend={['Python', 'Django']}
            />
          )}
          {selectedCourse === 'AI/ML Full Stack' && (
            <CourseDetails
              courseName="AI/ML FULL STACK"
              frontend={['HTML', 'CSS']}
              backend={['Python', 'Machine Learning', 'Deep Learning']}
            />
          )}
        </div>

        <br />
        <button type="submit" className="btn btn-primary">
          Register
        </button>

        {/* Back Button */}
        <button type="button" className="btn btn-secondary ms-2" onClick={handleBack}>
          Back
        </button>
      </form>
    </div>
  );
}
