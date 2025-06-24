import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StudentViewTrainer() {
  const location = useLocation();
  const navigate = useNavigate();
  const studentData = location.state?.student;  // Accessing the passed state

  // State for editing student details
  const [student, setStudent] = useState(studentData || {});
  const [isEditing, setIsEditing] = useState(false);  // Flag to toggle between edit/view mode

  // Handle input change while editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  // Handle save after editing
  const handleSave = () => {
    // Here you can save the updated student data
    setIsEditing(false);
    alert('Student details updated!');
    console.log('Updated Student:', student);
  };

  // Handle delete student
  const handleDelete = () => {
    // You can remove the student data or navigate to another page
    alert('Student deleted!');
    navigate('/'); // Example to navigate back to the home page or another page
  };

  // Navigate back to the previous page
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="container mt-5">
      {student ? (
        <>
          <h2 className="mb-4">Student Details</h2>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Student ID</th>
                <th>Course</th>
                <th>Frontend Technologies</th>
                <th>Backend Technologies</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={student.name}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={student.email}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    student.email
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      name="id"
                      value={student.id}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    student.id
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <select
                      name="course"
                      value={student.course}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="Java Full Stack">Java Full Stack</option>
                      <option value="Python Full Stack">Python Full Stack</option>
                      <option value="AI/ML Full Stack">AI/ML Full Stack</option>
                    </select>
                  ) : (
                    student.course
                  )}
                </td>
                <td>
                  <ul>
                    {student.course === 'Java Full Stack' && (
                      ['HTML', 'CSS', 'React'].map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))
                    )}
                    {student.course === 'Python Full Stack' && (
                      ['HTML', 'CSS', 'React'].map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))
                    )}
                    {student.course === 'AI/ML Full Stack' && (
                      ['HTML', 'CSS'].map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))
                    )}
                  </ul>
                </td>
                <td>
                  <ul>
                    {student.course === 'Java Full Stack' && (
                      ['Java', 'Spring Boot'].map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))
                    )}
                    {student.course === 'Python Full Stack' && (
                      ['Python', 'Django'].map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))
                    )}
                    {student.course === 'AI/ML Full Stack' && (
                      ['Python', 'Machine Learning', 'Deep Learning'].map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))
                    )}
                  </ul>
                </td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                  {isEditing ? (
                    <button className="btn btn-success" onClick={handleSave}>
                      Save
                    </button>
                  ) : (
                    <button className="btn btn-danger" onClick={handleDelete}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <p>No student data available.</p>
      )}

      <button className="btn btn-secondary mt-3" onClick={handleBack}>
        Back
      </button>
    </div>
  );
}
