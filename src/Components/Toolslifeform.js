import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Toollifeform = () => {
  const [toolDetails, setToolDetails] = useState([]);
  const [formData, setFormData] = useState({
    machineId: '',
    // toolId: '',
    // machineName: '',
    toolNumber: '',
    toolName: '',
    setLife: '',
    toolChangeDate: '',
    actualLife: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchToolDetails();
  }, []);

  const fetchToolDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/tools');
      setToolDetails(response.data);
    } catch (error) {
      console.error('Error fetching tool details data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5001/api/tools/${editId}`, formData);
        window.alert('Tool details updated successfully!');
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post('http://localhost:5001/api/tools', formData);
        window.alert('Tool details created successfully!');
      }
      fetchToolDetails();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving tool details:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      machineId: '',
      // toolId: '',
      // machineName: '',
      toolNumber: '',
      toolName: '',
      setLife: '',
      toolChangeDate: '',
      actualLife: ''
    });
  };

  const handleEdit = (tool) => {
    setIsEditing(true);
    setEditId(tool.toolId);
    setFormData(tool);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this record?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5001/api/tools/${id}`);
        window.alert('Tool details deleted successfully!');
        fetchToolDetails();
      } catch (error) {
        console.error('Error deleting tool details:', error);
      }
    }
  };

  const handleAddClick = () => {
    setShowForm(true);
    setIsEditing(false);
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


  return (
    <div className="container mt-5">
      <h1 className="mb-4">Manage Tool Details</h1>

      {!showForm && !isEditing && (
        <button className="btn btn-primary mb-3" onClick={handleAddClick}>
          Add Tool Details
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Machine ID</label>

                {/* Loading state */}
                {loading ? (
                  <p>Loading machine IDs...</p>
                ) : error ? (
                  <p>{error}</p> // Show error message if there is an error
                ) : (
                  <select
                    name="machineId"
                    className="form-control"
                    value={formData.machineId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select Machine ID</option>
                    {machineIds.map((id, index) => (
                      <option key={index} value={id}>{id}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            {/* <div className="col-md-4">
              <div className="form-group">
                <label>Tool ID</label>
                <input
                  type="text"
                  name="toolId"
                  className="form-control"
                  value={formData.toolId}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div> */}
            {/* <div className="col-md-4">
              <div className="form-group">
                <label>Machine Name</label>
                <input
                  type="text"
                  name="machineName"
                  className="form-control"
                  value={formData.machineName}
                  onChange={handleInputChange}
                />
              </div>
            </div> */}
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Tool Number</label>
                <input
                  type="text"
                  name="toolNumber"
                  className="form-control"
                  value={formData.toolNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Tool Name</label>
                <input
                  type="text"
                  name="toolName"
                  className="form-control"
                  value={formData.toolName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Set Life</label>
                <input
                  type="text"
                  name="setLife"
                  className="form-control"
                  value={formData.setLife}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Tool Change Date</label>
                <input
                  type="date"
                  name="toolChangeDate"
                  className="form-control"
                  value={formData.toolChangeDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Actual Life</label>
                <input
                  type="text"
                  name="actualLife"
                  className="form-control"
                  value={formData.actualLife}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Tool Details' : 'Add Tool Details'}
          </button>
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={() => {
              resetForm();
              setShowForm(false);
            }}
          >
            Cancel
          </button>
        </form>
      )}

      {!showForm && (
        <>
          <h2 className="mt-5">Tool Details List</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Machine ID</th>
                {/* <th>Tool ID</th> */}
                {/* <th>Machine Name</th> */}
                <th>Tool Number</th>
                <th>Tool Name</th>
                <th>Set Life</th>
                <th>Tool Change Date</th>
                <th>Actual Life</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {toolDetails.map((tool) => (
                <tr key={tool._id}>
                  <td>{tool.machineId}</td>
                  {/* <td>{tool.toolId}</td> */}
                  {/* <td>{tool.machineName}</td> */}
                  <td>{tool.toolNumber}</td>
                  <td>{tool.toolName}</td>
                  <td>{tool.setLife}</td>
                  <td>{new Date(tool.toolChangeDate).toLocaleDateString()}</td>
                  <td>{tool.actualLife}</td>
                  <td>
                    <button
                      className="btn btn-warning mr-2"
                      onClick={() => handleEdit(tool)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(tool.toolId)}
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

export default Toollifeform;
