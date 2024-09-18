// components/WorkForceManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkForceForm = () => {
  const [workforces, setWorkforces] = useState([]);
  const [formData, setFormData] = useState({
    EmpName: '',
    EmpEmail: '',
    EmpPhone: '',
    Role: '',
    Skills: '',
    Performance: '',
    TokenNo: '',
    AssignMachine: '',
    // SkillId: '',
    // EmpId: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false); // New state to toggle form visibility

  useEffect(() => {
    fetchWorkforces();
  }, []);

  const fetchWorkforces = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/workforce/alldata');
      setWorkforces(response.data);
    } catch (error) {
      console.error('Error fetching workforce data:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5001/api/workforce/${editId}`, formData);
      setIsEditing(false);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5001/api/workforce', formData);
    }
    fetchWorkforces(); // Refresh workforce list
    resetForm();
    setShowForm(false); // Hide form after submission
  };

  const resetForm = () => {
    setFormData({
      EmpName: '',
      EmpEmail: '',
      EmpPhone: '',
      Role: '',
      Skills: '',
      Performance: '',
      TokenNo: '',
      AssignMachine: '',
      // SkillId: '',
      // EmpId: ''
    });
  };

  const handleEdit = (workforce) => {
    setIsEditing(true);
    setEditId(workforce._id);
    setFormData(workforce);
    setShowForm(true); // Show form when editing
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5001/api/workforce/${id}`);
    fetchWorkforces(); // Refresh workforce list
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setEditId(null);
    resetForm();
    setShowForm(true); // Show form when adding a new workforce
  };

  const [machineIds, setMachineIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch machine data and extract only the machine IDs
  const fetchMachineData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/machines/ORG001');
      const machineIds = response.data.map(machine => machine.machineId); // Extract machine IDs
      setMachineIds(machineIds); // Set only the machine IDs in state
      setLoading(false); // Set loading to false after data is loaded
    } catch (err) {
      setError('Error fetching machine data');
      setLoading(false); // Ensure loading is stopped in case of an error
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchMachineData();
  }, []);


  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/skills');
        const data = await response.json(); // response.json() contains the actual data
        const skillNames = data.map(skill => skill.SkillName); // Extract SkillName from each skill object
        setSkills(skillNames); // Store the skill names in state
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills(); // Call the fetch function on component mount
  }, []);



  //   useEffect(() => {
  //     fetchSkills();
  // }, []);

  return (
    <div className="container-fluid mt-5">
      <h1 className="mb-4">Manage WorkForce</h1>

      {/* Button to Add New Workforce */}
      {!showForm && (
        <button className="btn btn-primary mb-4" onClick={handleAddClick}>
          Add New WorkForce
        </button>
      )}

      {/* Conditionally render form */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Employee Name</label>
                <input
                  type="text"
                  name="EmpName"
                  className="form-control"
                  value={formData.EmpName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Employee Email</label>
                <input
                  type="email"
                  name="EmpEmail"
                  className="form-control"
                  value={formData.EmpEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Employee Phone</label>
                <input
                  type="text"
                  name="EmpPhone"
                  className="form-control"
                  value={formData.EmpPhone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Role</label>
                <select
                  name="Role"
                  className="form-control"
                  value={formData.Role}
                  onChange={handleInputChange}
                >
                  <option value="">--Select Role--</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Production">Production</option>
                </select>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label>Skills</label>
                <select
                  name="Skills"
                  className="form-control"
                  value={formData.Skills}
                  onChange={handleInputChange}
                >
                  <option value="">--Select Skill--</option>
                  {skills.map((skill, index) => (
                    <option key={index} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label>Performance</label>
                <input
                  type="text"
                  name="Performance"
                  className="form-control"
                  value={formData.Performance}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Token No</label>
                <input
                  type="text"
                  name="TokenNo"
                  className="form-control"
                  value={formData.TokenNo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              {/* <div className="form-group">
                <label>Assign Machine</label>
                <input
                  type="text"
                  name="AssignMachine"
                  className="form-control"
                  value={formData.AssignMachine}
                  onChange={handleInputChange}
                />
              </div> */}
              <div className="form-group">
                <label>AssignMachine</label>

                {/* Loading state */}
                {loading ? (
                  <p>Loading machine IDs...</p>
                ) : error ? (
                  <p>{error}</p> // Show error message if there is an error
                ) : (
                  <select
                    name="AssignMachine"
                    className="form-control"
                    value={formData.machineId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Machine ID</option>
                    {machineIds.map((id, index) => (
                      <option key={index} value={id}>{id}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            {/* <div className="col-md-4">
              <div className="form-group">
                <label>Skill ID</label>
                <input
                  type="text"
                  name="SkillId"
                  className="form-control"
                  value={formData.SkillId}
                  onChange={handleInputChange}
                />
              </div>
            </div> */}
          </div>

          {/* <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Employee ID</label>
                <input
                  type="text"
                  name="EmpId"
                  className="form-control"
                  value={formData.EmpId}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div> */}

          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update WorkForce' : 'Add WorkForce'}
          </button>
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </form>
      )}

      {/* Display Table of Workforces */}
      {!showForm && (
        <>
          <h2 className="mt-5">WorkForce List</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Skills</th>
                <th>Performance</th>
                <th>TokenNo</th>
                <th>AssignMachine</th>
                {/* <th>Skill ID</th> */}
                {/* <th>Employee ID</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workforces.map((workforce) => (
                <tr key={workforce._id}>
                  <td>{workforce.EmpName}</td>
                  <td>{workforce.EmpEmail}</td>
                  <td>{workforce.EmpPhone}</td>
                  <td>{workforce.Role}</td>
                  <td>{workforce.Skills}</td>
                  <td>{workforce.Performance}</td>
                  <td>{workforce.TokenNo}</td>
                  <td>{workforce.AssignMachine}</td>
                  {/* <td>{workforce.SkillId}</td> */}
                  {/* <td>{workforce.EmpId}</td> */}
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleEdit(workforce)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleDelete(workforce._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default WorkForceForm;
