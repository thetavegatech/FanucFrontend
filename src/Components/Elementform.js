import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap styling is applied

const ElementForm = () => {
  const [elementName, setElementName] = useState('');
  const [elementDescription, setElementDescription] = useState('');
  const [machineId, setMachineId] = useState('');
  const [machineIds, setMachineIds] = useState([]);
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingElement, setEditingElement] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingElement) {
        // Update existing element
        await axios.put(`http://localhost:5001/api/elements/${editingElement._id}`, {
          ElementName: elementName,
          ElementDescription: elementDescription,
          MachineId: machineId,
        });
        setEditingElement(null);
      } else {
        // Create new element
        await axios.post('http://localhost:5001/api/elements', {
          ElementName: elementName,
          ElementDescription: elementDescription,
          MachineId: machineId,
        });
      }
      // Clear the form fields and fetch updated elements
      setElementName('');
      setElementDescription('');
      setMachineId('');
      fetchElements();
      alert('Element saved successfully');
    } catch (error) {
      console.error('Error saving element:', error);
      alert('Error saving element');
    }
  };

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

  const fetchElements = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/elements');
      setElements(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching elements');
      setLoading(false);
    }
  };

  const handleEdit = (element) => {
    setElementName(element.ElementName);
    setElementDescription(element.ElementDescription);
    setMachineId(element.MachineId);
    setEditingElement(element);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/elements/${id}`);
      fetchElements();
      alert('Element deleted successfully');
    } catch (error) {
      console.error('Error deleting element:', error);
      alert('Error deleting element');
    }
  };

  useEffect(() => {
    fetchMachineData();
    fetchElements();
  }, []);

  return (
    <div className="container mt-4">
      <h2>{editingElement ? 'Edit Element' : 'Create Element'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="machineId">Machine ID</label>
            {loading ? (
              <p>Loading machine IDs...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <select
                id="machineId"
                name="machineId"
                className="form-control"
                value={machineId}
                onChange={(e) => setMachineId(e.target.value)}
                required
              >
                <option value="" disabled>Select Machine ID</option>
                {machineIds.map((id, index) => (
                  <option key={index} value={id}>{id}</option>
                ))}
              </select>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="elementName">Element Name:</label>
            <input
              type="text"
              className="form-control"
              id="elementName"
              value={elementName}
              onChange={(e) => setElementName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="elementDescription">Element Description:</label>
            <input
              type="text"
              className="form-control"
              id="elementDescription"
              value={elementDescription}
              onChange={(e) => setElementDescription(e.target.value)}
              required
            />
          </div>
          <div className="col-md-2 d-flex align-items-end mt-2">
            <button type="submit" className="btn btn-primary w-100">
              {editingElement ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </form>

      <h3 className="mt-4">Elements List</h3>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Machine ID</th>
            <th>Element Name</th>
            <th>Element Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {elements.length > 0 ? (
            elements.map((element, index) => (
              <tr key={index}>
                <td>{element.MachineId}</td>
                <td>{element.ElementName}</td>
                <td>{element.ElementDescription}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(element)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(element._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No elements found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ElementForm;
