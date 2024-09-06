import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Skillsform = () => {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    SkillName: '',
    Description: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5001/api/skills/update/${editId}`, formData);
      setIsEditing(false);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5001/api/skills/create', formData);
    }
    fetchSkills(); // Refresh skills list
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      SkillName: '',
      Description: ''
    });
  };

  const handleEdit = (skill) => {
    setIsEditing(true);
    setEditId(skill._id);
    setFormData(skill);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5001/api/skills/delete/${id}`);
    fetchSkills(); // Refresh skills list
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Manage Skills</h1>

      {/* Form to Add/Edit Skill */}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Skill Name</label>
              <input
                type="text"
                name="SkillName"
                className="form-control"
                value={formData.SkillName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="Description"
                className="form-control"
                value={formData.Description}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update Skill' : 'Add Skill'}
        </button>
      </form>

      {/* Display Table of Skills */}
      <h2 className="mt-5">Skills List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Skill Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill._id}>
              <td>{skill.SkillName}</td>
              <td>{skill.Description}</td>
              <td>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => handleEdit(skill)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(skill._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Skillsform;
