import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MaintenanceScheduleForm = () => {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    machineId: '',
    elementId: '',
    elementName: '', // Added field for Element Name
    elementDescription: '',
    type: '',
    frequency: '',
    conditionTag: '',
    remark: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [machineIds, setMachineIds] = useState([]);
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Frequency options
  const frequencyOptions = [
    'Daily',
    'Weekly',
    'Monthly',
    'Quarterly',
    'Yearly'
  ];

  // Fetch machine data on component mount
  useEffect(() => {
    fetchMachineData();
  }, []);

  // Fetch schedules from the API
  useEffect(() => {
    fetchSchedules();
  }, []);

  // Fetch machine IDs
  const fetchMachineData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/machines/ORG001');
      const machineIds = response.data.map(machine => machine.machineId);
      setMachineIds(machineIds);
      setLoading(false);
    } catch (err) {
      setError('Error fetching machine data');
      setLoading(false);
    }
  };

  // Fetch maintenance schedules
  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/maintenance');
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching maintenance schedules:', error);
    }
  };

  // Fetch elements based on selected machine ID
  const fetchElementsByMachineId = async (machineId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/elements/machine/${machineId}`);
      setElements(response.data);
    } catch (err) {
      console.error('Error fetching elements:', err);
    }
  };

  // Handle machine ID change
  const handleMachineIdChange = (e) => {
    const selectedMachineId = e.target.value;
    setFormData({ ...formData, machineId: selectedMachineId, elementId: '' });
    fetchElementsByMachineId(selectedMachineId); // Fetch elements when machine ID changes
  };

  // Handle element change
  const handleElementChange = (e) => {
    const selectedElementId = e.target.value;
    const selectedElement = elements.find(element => element._id === selectedElementId);
    setFormData({
      ...formData,
      elementId: selectedElementId,
      elementName: selectedElement ? selectedElement.ElementName : '', // Save Element Name
      elementDescription: selectedElement ? selectedElement.ElementDescription : ''
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle frequency change
  const handleFrequencyChange = (e) => {
    setFormData({ ...formData, frequency: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5001/api/maintenance/${editId}`, formData);
      setIsEditing(false);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5001/api/maintenance', formData);
    }
    fetchSchedules();
    resetForm();
    setShowForm(false);
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      machineId: '',
      elementId: '',
      elementName: '', // Reset Element Name
      elementDescription: '',
      type: '',
      frequency: '',
      conditionTag: '',
      remark: ''
    });
  };

  // Handle edit
  const handleEdit = (schedule) => {
    setIsEditing(true);
    setEditId(schedule._id);
    setFormData(schedule);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5001/api/maintenance/${id}`);
    fetchSchedules();
  };

  // Handle add button click
  const handleAddClick = () => {
    setShowForm(true);
    setIsEditing(false);
    resetForm();
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Manage Maintenance Schedules</h1>

      {!showForm && (
        <button className="btn btn-primary mb-4" onClick={handleAddClick}>
          Add Schedule
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Machine ID</label>
                {loading ? (
                  <p>Loading machine IDs...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  <select
                    name="machineId"
                    className="form-control"
                    value={formData.machineId}
                    onChange={handleMachineIdChange}
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
            <div className="col-md-4">
              <div className="form-group">
                <label>Element</label>
                <select
                  name="elementId"
                  className="form-control"
                  value={formData.elementId}
                  onChange={handleElementChange}
                  required
                >
                  <option value="" disabled>Select Element</option>
                  {elements.map((element) => (
                    <option key={element._id} value={element._id}>
                      {element.ElementName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Element Description</label>
                <input
                  type="text"
                  name="elementDescription"
                  className="form-control"
                  value={formData.elementDescription}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Type</label>
                <input
                  type="text"
                  name="type"
                  className="form-control"
                  value={formData.type}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Frequency</label>
                <select
                  name="frequency"
                  className="form-control"
                  value={formData.frequency}
                  onChange={handleFrequencyChange}
                >
                  <option value="" disabled>Select Frequency</option>
                  {frequencyOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Condition Tag</label>
                <input
                  type="text"
                  name="conditionTag"
                  className="form-control"
                  value={formData.conditionTag}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Remark</label>
                <input
                  type="text"
                  name="remark"
                  className="form-control"
                  value={formData.remark}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Schedule' : 'Add Schedule'}
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </form>
      )}

      {!showForm && (
        <>
          <h2 className="mt-5">Maintenance Schedules</h2>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Machine ID</th>
                <th>Element Name</th>
                <th>Element Description</th>
                <th>Type</th>
                <th>Frequency</th>
                <th>Condition Tag</th>
                <th>Remark</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map(schedule => (
                <tr key={schedule._id}>
                  <td>{schedule.machineId}</td>
                  <td>{schedule.elementName}</td>
                  <td>{schedule.elementDescription}</td>
                  <td>{schedule.type}</td>
                  <td>{schedule.frequency}</td>
                  <td>{schedule.conditionTag}</td>
                  <td>{schedule.remark}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(schedule)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => handleDelete(schedule._id)}
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

export default MaintenanceScheduleForm;
