import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Nav, Form, Button, Table } from 'react-bootstrap';
import gmailImg from '../images/gmailImg.jpg'; // Adjust path as needed

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081/api';

const TrainerDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [assessmentType, setAssessmentType] = useState('');
  const [assessmentName, setAssessmentName] = useState('');
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);
  const [viewAssessments, setViewAssessments] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', trainerId: '' });
  const [showPapers, setShowPapers] = useState(false);
  const [selectedAssessmentName, setSelectedAssessmentName] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [assessments, setAssessments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showAddPaperForm, setShowAddPaperForm] = useState(false);
  const [paperDetails, setPaperDetails] = useState({
    assessmentName: '',
    paperName: '',
    questions: [{ questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', answer: '' }],
  });

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/trainers/login`, {
        email: loginData.email,
        trainerId: loginData.trainerId,
      });
      if (response.status === 200) {
        setIsLoggedIn(true);
        setFormError('');
      }
    } catch (error) {
      setFormError(error.response?.data || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAssessments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/assessments`, {
        params: { trainerId: loginData.trainerId },
      });
      setAssessments(response.data);
    } catch (error) {
      setFormError('Failed to fetch assessments.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditAssessment = (index) => {
    setEditingIndex(index);
    setAssessmentName(assessments[index].name);
    setAssessmentType(assessments[index].type);
    setShowAssessmentForm(true);
    setViewAssessments(false);
    setShowPapers(false);
    setShowAddPaperForm(false);
    setFormError('');
  };

  const handleAddAssessment = async (e) => {
    e.preventDefault();
    if (!assessmentName || !assessmentType) {
      setFormError('Please fill out all fields.');
      return;
    }
    setLoading(true);
    try {
      const newAssessment = {
        name: assessmentName,
        type: assessmentType,
        mcqCount: 0,
        programCount: 0,
        status: 'Active',
        createdBy: loginData.email.split('@')[0],
        createdAt: new Date().toLocaleString(),
      };
      await axios.post(`${API_BASE_URL}/assessments`, newAssessment, {
        params: { trainerId: loginData.trainerId },
      });
      await fetchAssessments();
      setAssessmentName('');
      setAssessmentType('');
      setShowAssessmentForm(false);
      setViewAssessments(true);
      setFormError('');
    } catch (error) {
      setFormError(error.response?.data || 'Failed to add assessment.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAssessment = async (e) => {
    e.preventDefault();
    if (!assessmentName || !assessmentType) {
      setFormError('Please fill out all fields.');
      return;
    }
    setLoading(true);
    try {
      const updatedAssessment = {
        name: assessmentName,
        type: assessmentType,
        mcqCount: assessments[editingIndex].mcqCount,
        programCount: assessments[editingIndex].programCount,
        status: assessments[editingIndex].status,
        createdBy: assessments[editingIndex].createdBy,
        createdAt: assessments[editingIndex].createdAt,
      };
      await axios.put(`${API_BASE_URL}/assessments/${assessments[editingIndex].name}`, updatedAssessment);
      await fetchAssessments();
      setAssessmentName('');
      setAssessmentType('');
      setEditingIndex(null);
      setShowAssessmentForm(false);
      setViewAssessments(true);
      setFormError('');
    } catch (error) {
      setFormError(error.response?.data || 'Failed to update assessment.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAssessment = async (index) => {
    if (window.confirm('Are you sure you want to delete this assessment?')) {
      setLoading(true);
      try {
        await axios.delete(`${API_BASE_URL}/assessments/${assessments[index].name}`);
        await fetchAssessments();
      } catch (error) {
        setFormError('Failed to delete assessment.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/trainers/logout`, { trainerId: loginData.trainerId });
      setIsLoggedIn(false);
      setLoginData({ email: '', trainerId: '' });
      setFormError('');
      setShowAssessmentForm(false);
      setViewAssessments(false);
      setShowPapers(false);
      setAssessments([]);
      setEditingIndex(null);
      setPaperDetails({
        assessmentName: '',
        paperName: '',
        questions: [{ questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', answer: '' }],
      });
    } catch (error) {
      setFormError('Logout failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleShowAddPaperForm = (assessmentName) => {
    setPaperDetails({
      assessmentName,
      paperName: '',
      questions: [{ questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', answer: '' }],
    });
    setShowAddPaperForm(true);
    setShowAssessmentForm(false);
    setViewAssessments(false);
    setShowPapers(false);
  };

  const handleAddQuestion = () => {
    setPaperDetails({
      ...paperDetails,
      questions: [
        ...paperDetails.questions,
        { questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', answer: '' },
      ],
    });
  };

  const handleQuestionInputChange = (index, field, value) => {
    const newQuestions = [...paperDetails.questions];
    newQuestions[index][field] = value;
    setPaperDetails({ ...paperDetails, questions: newQuestions });
  };

  const handlePaperSubmit = async (e) => {
    e.preventDefault();
    if (!paperDetails.paperName || paperDetails.questions.some(q => !q.questionText || !q.answer)) {
      setFormError('Please fill out all fields for the paper and questions.');
      return;
    }
    setLoading(true);
    try {
      const newPaper = {
        paperName: paperDetails.paperName,
        questions: paperDetails.questions.map(q => ({
          questionText: q.questionText,
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC,
          optionD: q.optionD,
          answer: q.answer,
        })),
      };
      await axios.post(`${API_BASE_URL}/assessments/${paperDetails.assessmentName}/papers`, newPaper);
      await fetchAssessments();
      setShowAddPaperForm(false);
      setViewAssessments(true);
      setPaperDetails({
        assessmentName: '',
        paperName: '',
        questions: [{ questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', answer: '' }],
      });
      setFormError('');
    } catch (error) {
      setFormError(error.response?.data || 'Failed to add paper.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewPapers = (assessmentName) => {
    setSelectedAssessmentName(assessmentName);
    setShowPapers(true);
    setViewAssessments(false);
    setShowAssessmentForm(false);
    setShowAddPaperForm(false);
  };

  const getAssessmentPapers = (assessmentName) => {
    const assessment = assessments.find((a) => a.name === assessmentName);
    return assessment ? assessment.papers || [] : [];
  };

  useEffect(() => {
    if (isLoggedIn && viewAssessments) {
      fetchAssessments();
    }
  }, [isLoggedIn, viewAssessments]);

  return (
    <Container fluid className="vh-100 d-flex flex-column">
      <div className="header-logo p-2 bg-light">
        <div>
          <img src={gmailImg} alt="Logo" style={{ height: '20px', marginRight: '10px' }} />
          trainer@gmail.com
        </div>
      </div>
      {isLoggedIn ? (
        <Row className="flex-grow-1 g-0">
          {/* Sidebar */}
          <Col md={3} className="bg-info text-white d-flex flex-column p-4">
            <Card className="mb-5 shadow h-100">
              <Card.Body>
                <Card.Title className="text-center">
                  <h3>Trainer Dashboard</h3>
                </Card.Title>
                <Nav className="flex-column text-center">
                  <Nav.Link
                    href="#"
                    className="btn btn-outline-light mb-2"
                    onClick={() => {
                      setShowAssessmentForm(false);
                      setViewAssessments(false);
                      setShowPapers(false);
                      setShowAddPaperForm(false);
                    }}
                  >
                    Dashboard
                  </Nav.Link>
                  <Nav.Link href="#" className="btn btn-outline-light mb-2">
                    View Students
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    className="btn btn-outline-light mb-2"
                    onClick={() => {
                      setShowAssessmentForm(true);
                      setViewAssessments(false);
                      setShowPapers(false);
                      setShowAddPaperForm(false);
                      setEditingIndex(null);
                      setAssessmentName('');
                      setAssessmentType('');
                    }}
                  >
                    Add Assessment
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    className="btn btn-outline-light mb-2"
                    onClick={() => {
                      setViewAssessments(true);
                      setShowAssessmentForm(false);
                      setShowPapers(false);
                      setShowAddPaperForm(false);
                    }}
                  >
                    View Assessments
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </Nav.Link>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          {/* Main Content */}
          <Col md={9} className="d-flex justify-content-center align-items-start p-4">
            <Card className="shadow-lg p-4 rounded border w-100">
              <Card.Body>
                {loading && <div className="alert alert-info">Loading...</div>}
                {formError && (
                  <div className="alert alert-danger alert-dismissible fade show">
                    {formError}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setFormError('')}
                    ></button>
                  </div>
                )}
                {showAssessmentForm && (
                  <>
                    <Card.Title className="text-center mb-4">
                      <h2>{editingIndex !== null ? 'Edit Assessment' : 'Add Assessment'}</h2>
                    </Card.Title>
                    <Form onSubmit={editingIndex !== null ? handleUpdateAssessment : handleAddAssessment}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Assessment Type</Form.Label>
                        <div>
                          <Form.Check
                            inline
                            label="MCQ"
                            name="assessmentType"
                            type="radio"
                            value="MCQ"
                            checked={assessmentType === 'MCQ'}
                            onChange={(e) => setAssessmentType(e.target.value)}
                          />
                          <Form.Check
                            inline
                            label="Program"
                            name="assessmentType"
                            type="radio"
                            value="Program"
                            checked={assessmentType === 'Program'}
                            onChange={(e) => setAssessmentType(e.target.value)}
                          />
                          <Form.Check
                            inline
                            label="Both"
                            name="assessmentType"
                            type="radio"
                            value="Both"
                            checked={assessmentType === 'Both'}
                            onChange={(e) => setAssessmentType(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Assessment Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter assessment name"
                          value={assessmentName}
                          onChange={(e) => setAssessmentName(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Button type="submit" variant="primary" className="w-100 fw-bold" disabled={loading}>
                        {editingIndex !== null ? 'Update Assessment' : 'Add Assessment'}
                      </Button>
                      <Button
                        variant="secondary"
                        className="w-100 mt-3"
                        onClick={() => {
                          setShowAssessmentForm(false);
                          setEditingIndex(null);
                          setAssessmentName('');
                          setAssessmentType('');
                          setFormError('');
                        }}
                        disabled={loading}
                      >
                        Back
                      </Button>
                    </Form>
                  </>
                )}
                {viewAssessments && (
                  <>
                    <Card.Title className="text-center mb-4">
                      <h2>View Assessments</h2>
                    </Card.Title>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>Assessment Name</th>
                          <th>Assessment Type</th>
                          <th>No. of MCQs</th>
                          <th>No. of Programs</th>
                          <th>Status</th>
                          <th>Created By</th>
                          <th>Added On</th>
                          <th>Actions</th>
                          <th>Add Paper</th>
                          <th>View Papers</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assessments.map((a, index) => (
                          <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.type}</td>
                            <td>{a.mcqCount}</td>
                            <td>{a.programCount}</td>
                            <td>{a.status}</td>
                            <td>{a.createdBy}</td>
                            <td>{a.createdAt}</td>
                            <td>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleEditAssessment(index)}
                                disabled={loading}
                              >
                                Edit
                              </Button>{' '}
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteAssessment(index)}
                                disabled={loading}
                              >
                                Delete
                              </Button>
                            </td>
                            <td>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleShowAddPaperForm(a.name)}
                                disabled={loading}
                              >
                                Add
                              </Button>
                            </td>
                            <td>
                              <Button
                                variant="info"
                                size="sm"
                                onClick={() => handleViewPapers(a.name)}
                                disabled={loading}
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Button
                      variant="secondary"
                      className="w-100 mt-3"
                      onClick={() => setViewAssessments(false)}
                      disabled={loading}
                    >
                      Back to Dashboard
                    </Button>
                  </>
                )}
                {showPapers && (
                  <>
                    <Card.Title className="text-center mb-4">
                      <h2>Papers for {selectedAssessmentName}</h2>
                    </Card.Title>
                    {getAssessmentPapers(selectedAssessmentName).length > 0 ? (
                      getAssessmentPapers(selectedAssessmentName).map((paper, paperIndex) => (
                        <Card key={paperIndex} className="mb-4">
                          <Card.Body>
                            <h4 className="mb-3">Paper: {paper.paperName}</h4>
                            {paper.questions.map((question, questionIndex) => (
                              <div key={questionIndex} className="mb-4 p-3 border rounded">
                                <h5>Question {questionIndex + 1}</h5>
                                <p><strong>Question:</strong> {question.questionText}</p>
                                <p><strong>Option A:</strong> {question.optionA}</p>
                                <p><strong>Option B:</strong> {question.optionB}</p>
                                <p><strong>Option C:</strong> {question.optionC}</p>
                                <p><strong>Option D:</strong> {question.optionD}</p>
                                <p><strong>Answer:</strong> {question.answer}</p>
                              </div>
                            ))}
                          </Card.Body>
                        </Card>
                      ))
                    ) : (
                      <p>No papers added for this assessment yet.</p>
                    )}
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setShowPapers(false);
                        setViewAssessments(true);
                      }}
                      disabled={loading}
                    >
                      Back to Assessments
                    </Button>
                  </>
                )}
                {showAddPaperForm && (
                  <Card className="mt-4">
                    <Card.Body>
                      <h2 className="text-center mb-4">Add Paper for {paperDetails.assessmentName}</h2>
                      <Form onSubmit={handlePaperSubmit}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-bold">Paper Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter paper name"
                            value={paperDetails.paperName}
                            onChange={(e) => setPaperDetails({ ...paperDetails, paperName: e.target.value })}
                            required
                          />
                        </Form.Group>
                        {paperDetails.questions.map((question, index) => (
                          <div key={index} className="mb-4 p-3 border rounded">
                            <h4>Question {index + 1}</h4>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-bold">Question Text</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={2}
                                value={question.questionText}
                                onChange={(e) => handleQuestionInputChange(index, 'questionText', e.target.value)}
                                required
                              />
                            </Form.Group>
                            <Row>
                              <Col md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label className="fw-bold">Option A</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={question.optionA}
                                    onChange={(e) => handleQuestionInputChange(index, 'optionA', e.target.value)}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label className="fw-bold">Option B</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={question.optionB}
                                    onChange={(e) => handleQuestionInputChange(index, 'optionB', e.target.value)}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label className="fw-bold">Option C</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={question.optionC}
                                    onChange={(e) => handleQuestionInputChange(index, 'optionC', e.target.value)}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label className="fw-bold">Option D</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={question.optionD}
                                    onChange={(e) => handleQuestionInputChange(index, 'optionD', e.target.value)}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-bold">Answer</Form.Label>
                              <Form.Control
                                type="text"
                                value={question.answer}
                                onChange={(e) => handleQuestionInputChange(index, 'answer', e.target.value)}
                                required
                              />
                            </Form.Group>
                          </div>
                        ))}
                        <Button
                          variant="outline-primary"
                          className="mb-3"
                          onClick={handleAddQuestion}
                          disabled={loading}
                        >
                          Add Question
                        </Button>
                        <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                          Submit Paper
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          className="w-100 mt-2"
                          onClick={() => {
                            setShowAddPaperForm(false);
                            setViewAssessments(true);
                            setFormError('');
                          }}
                          disabled={loading}
                        >
                          Back
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                )}
                {!showAssessmentForm && !viewAssessments && !showPapers && !showAddPaperForm && (
                  <div className="text-center p-5">
                    <h3>Welcome to the Trainer Dashboard</h3>
                    <p>Select an option from the sidebar to get started.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Card className="shadow-sm" style={{ width: '100%', maxWidth: '500px' }}>
            <Card.Header className="bg-primary text-white text-center py-3">
              <h4 className="mb-0">
                <i className="bi bi-box-arrow-in-right me-2"></i>Trainer Login
              </h4>
            </Card.Header>
            <Form onSubmit={handleLogin} className="card-body p-4">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Email</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-envelope text-primary"></i>
                  </span>
                  <Form.Control
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Trainer ID</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-shield-lock text-primary"></i>
                  </span>
                  <Form.Control
                    type="text"
                    name="trainerId"
                    value={loginData.trainerId}
                    onChange={handleLoginInputChange}
                    placeholder="Enter your ID"
                    required
                  />
                </div>
              </Form.Group>
              {formError && (
                <div className="alert alert-danger mb-3">{formError}</div>
              )}
              <Button
                type="submit"
                variant="primary"
                className="w-100 py-2"
                disabled={loading}
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>Login
              </Button>
            </Form>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default TrainerDashboard;