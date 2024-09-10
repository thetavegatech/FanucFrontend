import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Utility function to format date for datetime-local input
const formatDateForInput = (dateString) => {
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
  return adjustedDate.toISOString().slice(0, 16); // Format to 'YYYY-MM-DDTHH:MM'
};

const PmcParameterform = () => {
  const [parameters, setParameters] = useState([]);
  const [parameterForm, setParameterForm] = useState({
    parameterName: '',
    parameterAddress: '',
    parameterType: '',
    dataType: '',
    readCycle: '',
    description: '',
    timestamp: '',
    MachineId: '',
    EmpId: ''
  });
  const [editingParameterId, setEditingParameterId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch PMC parameters data
  const fetchParameters = async () => {
    const mid = 1234;
    try {
      const response = await axios.get(`http://localhost:5001/api/pmc-parameters/machine/${mid}`);
      setParameters(response.data);
    } catch (error) {
      console.error('Error fetching PMC parameters', error);
    }
  };

  useEffect(() => {
    fetchParameters();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParameterForm({ ...parameterForm, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingParameterId) {
        await axios.put(`http://localhost:5001/api/pmc-parameters/${editingParameterId}`, parameterForm);
      } else {
        await axios.post('http://localhost:5001/api/pmc-parameters', parameterForm);
      }
      fetchParameters();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving PMC parameter', error);
    }
  };

  // Reset form
  const resetForm = () => {
    setParameterForm({
      parameterName: '',
      parameterAddress: '',
      parameterType: '',
      dataType: '',
      readCycle: '',
      description: '',
      timestamp: '',
      MachineId: '',
      EmpId: ''
    });
    setEditingParameterId(null);
  };

  // Handle edit
  const handleEdit = (parameter) => {
    setParameterForm({
      parameterName: parameter.parameterName,
      parameterAddress: parameter.parameterAddress,
      parameterType: parameter.parameterType,
      dataType: parameter.dataType,
      readCycle: parameter.readCycle,
      description: parameter.description,
      timestamp: formatDateForInput(parameter.timestamp),
      MachineId: parameter.MachineId,
      EmpId: parameter.EmpId
    });
    setEditingParameterId(parameter._id);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/pmc-parameters/${id}`);
      fetchParameters();
    } catch (error) {
      console.error('Error deleting PMC parameter', error);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4">PMC Parameters Manager</h2>
      {!showForm ? (
        <>
          <button className="btn btn-primary mb-3" onClick={() => setShowForm(true)}>
            Add Parameter
          </button>

          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">ParameterName</th>
                <th scope="col">ParameterAddress</th>
                <th scope="col">ParameterType</th>
                <th scope="col">DataType</th>
                <th scope="col">ReadCycle</th>
                <th scope="col">Description</th>
                <th scope="col">Timestamp</th>
                <th scope="col">MachineID</th>
                <th scope="col">EmployeeID</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parameters.map((parameter) => (
                <tr key={parameter._id}>
                  <td>{parameter.parameterName}</td>
                  <td>{parameter.parameterAddress}</td>
                  <td>{parameter.parameterType}</td>
                  <td>{parameter.dataType}</td>
                  <td>{parameter.readCycle}</td>
                  <td>{parameter.description}</td>
                  <td>{new Date(parameter.timestamp).toLocaleString()}</td>
                  <td>{parameter.MachineId}</td>
                  <td>{parameter.EmpId}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(parameter)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(parameter._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <form onSubmit={handleFormSubmit} className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Parameter Name</label>
            <input
              type="text"
              className="form-control"
              name="parameterName"
              value={parameterForm.parameterName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Parameter Address</label>
            <input
              type="text"
              className="form-control"
              name="parameterAddress"
              value={parameterForm.parameterAddress}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Parameter Type</label>
            <input
              type="text"
              className="form-control"
              name="parameterType"
              value={parameterForm.parameterType}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Data Type</label>
            <input
              type="text"
              className="form-control"
              name="dataType"
              value={parameterForm.dataType}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Read Cycle</label>
            <input
              type="number"
              className="form-control"
              name="readCycle"
              value={parameterForm.readCycle}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={parameterForm.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Timestamp</label>
            <input
              type="datetime-local"
              className="form-control"
              name="timestamp"
              value={parameterForm.timestamp}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Machine ID</label>
            <input
              type="text"
              className="form-control"
              name="MachineId"
              value={parameterForm.MachineId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Employee ID</label>
            <input
              type="text"
              className="form-control"
              name="EmpId"
              value={parameterForm.EmpId}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              {editingParameterId ? 'Update Parameter' : 'Add Parameter'}
            </button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => { resetForm(); setShowForm(false); }}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PmcParameterform;
