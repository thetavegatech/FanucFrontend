import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TPMSForm = () => {
  const [formData, setFormData] = useState({
    lossType: '',
    machineId: '',
    EmpName: '',
    actionTaken: '',
    status: '',
    startDateTime: '',
    endDateTime: '',
  });

  const [tpmsData, setTpmsData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const lossTypes = ['Machine Breakdown', 'Quality Issue', 'Material Shortage', 'Other']; // Predefined loss types

  useEffect(() => {
    fetchTpmsData();
  }, []);

  const fetchTpmsData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/tpmsdata');
      setTpmsData(response.data);
    } catch (error) {
      console.error('Error fetching TPMS data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.endDateTime) {
      setFormData((prevData) => ({ ...prevData, endDateTime: null }));
    }

    if (editId) {
      await updateTpms(editId);
    } else {
      await createTpms();
    }
    setShowForm(false);
  };

  const createTpms = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/tpmsdata', formData);
      setTpmsData((prevData) => [...prevData, response.data]);
      alert('Record created successfully!');
    } catch (error) {
      console.error('Error creating TPMS entry:', error);
    }
    resetForm();
  };

  const updateTpms = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5001/api/tpmsdata/${id}`, formData);
      setTpmsData((prevData) => prevData.map((item) => (item._id === id ? response.data : item)));
      alert('Record updated successfully!');
    } catch (error) {
      console.error('Error updating TPMS entry:', error);
    }
    resetForm();
  };

  const deleteTpms = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`http://localhost:5001/api/tpmsdata/${id}`);
        setTpmsData((prevData) => prevData.filter((item) => item._id !== id));
        alert('Record deleted successfully!');
      } catch (error) {
        console.error('Error deleting TPMS entry:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      lossType: '',
      machineId: '',
      EmpName: '',
      actionTaken: '',
      status: '',
      startDateTime: '',
      endDateTime: '',
    });
    setEditId(null);
  };

  const handleEdit = (item) => {
    // Convert UTC to local time for startDateTime
    const localStartDateTime = convertUTCToLocal(item.startDateTime);
    const localEndDateTime = item.endDateTime ? convertUTCToLocal(item.endDateTime) : '';

    setFormData({
      lossType: item.lossType,
      machineId: item.machineId,
      EmpName: item.EmpName,
      actionTaken: item.actionTaken,
      status: item.status,
      startDateTime: localStartDateTime,
      endDateTime: localEndDateTime,
    });
    setEditId(item._id);
    setShowForm(true);
  };

  // Function to convert UTC date-time to local date-time string format for datetime-local input
  const convertUTCToLocal = (utcDate) => {
    const date = new Date(utcDate);
    const offset = date.getTimezoneOffset() * 60000; // Timezone offset in milliseconds
    const localDate = new Date(date.getTime() - offset); // Adjust date by timezone offset

    return localDate.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:MM
  };

  const [machineIds, setMachineIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchMachineData();
  }, []);

  const [empNames, setEmpNames] = useState([]);

  const fetchEmpNames = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/workforce');
      setEmpNames(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching technician names');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmpNames();
  }, []);

  return (
    <div className="container mt-4">
      <h2>TPMS Form</h2>

      {!showForm && (
        <button
          className="btn btn-primary mb-3"
          onClick={() => setShowForm(true)}
        >
          Add Data
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label htmlFor="lossType">Loss Type</label>
                <select
                  id="lossType"
                  name="lossType"
                  className="form-control"
                  value={formData.lossType}
                  onChange={handleChange}
                  required
                >
                  <option value="">--Select Loss Type--</option>
                  {lossTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
                    onChange={handleChange}
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
                <label>EmpName</label>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  <select
                    name="EmpName"
                    className="form-control"
                    value={formData.EmpName}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an Emp Name</option>
                    {empNames.map((name, index) => (
                      <option key={index} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label htmlFor="actionTaken">Action Taken</label>
                <input
                  type="text"
                  id="actionTaken"
                  name="actionTaken"
                  className="form-control"
                  placeholder="Action Taken"
                  value={formData.actionTaken}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  className="form-control"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Status</option>
                  <option value="open">Open</option>
                  <option value="close">Close</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label htmlFor="startDateTime">Start Date & Time</label>
                <input
                  type="datetime-local"
                  id="startDateTime"
                  name="startDateTime"
                  className="form-control"
                  value={formData.startDateTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label htmlFor="endDateTime">End Date & Time</label>
                <input
                  type="datetime-local"
                  id="endDateTime"
                  name="endDateTime"
                  className="form-control"
                  value={formData.endDateTime}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            {editId ? 'Update' : 'Create'}
          </button>
          <button
            type="button"
            className="btn btn-secondary mt-3 ml-2"
            onClick={() => {
              resetForm();
              setShowForm(false);
            }}
          >
            Clear
          </button>
        </form>
      )}

      <h2 className="mt-5">TPMS Data</h2>
      <table className="table table-bordered table-striped mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Loss Type</th>
            <th>Machine ID</th>
            <th>Employee Name</th>
            <th>Action Taken</th>
            <th>Status</th>
            <th>Start Date & Time</th>
            <th>End Date & Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tpmsData.length > 0 ? (
            tpmsData.map((item) => (
              <tr key={item._id}>
                <td>{item.lossType}</td>
                <td>{item.machineId}</td>
                <td>{item.EmpName}</td>
                <td>{item.actionTaken}</td>
                <td>{item.status}</td>
                <td>{item.startDateTime ? new Date(item.startDateTime).toLocaleString() : 'N/A'}</td>
                <td>{item.endDateTime ? new Date(item.endDateTime).toLocaleString() : 'N/A'}</td>
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="btn btn-danger btn-sm ml-2" onClick={() => deleteTpms(item._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TPMSForm;
