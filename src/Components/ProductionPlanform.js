import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductionManager = () => {
    const [productions, setProductions] = useState([]);
    const [machineId, setMachineId] = useState('');
    const [cycleTime, setCycleTime] = useState('');
    const [plannedQty, setPlannedQty] = useState('');
    const [partName, setPartName] = useState('');
    const [planDescription, setPlanDescription] = useState('');
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [partNames, setPartNames] = useState([]);

    useEffect(() => {
        fetchProductions();
        fetchPartNames();
    }, []);

    // Fetch productions from the API
    const fetchProductions = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/productionalldata');
            setProductions(response.data);
        } catch (error) {
            console.error('Error fetching productions:', error);
        }
    };

    // Fetch part names from the API
    const fetchPartNames = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/part/getallpartname');
            setPartNames(response.data);
        } catch (error) {
            console.error('Error fetching part names:', error);
        }
    };

    // Add or update a production
    const handleAddOrUpdate = async () => {
        try {
            const payload = {
                machineId,
                CycleTime: cycleTime,
                PlannedQty: plannedQty,
                PartName: partName,
                PlanDescription: planDescription,
            };

            if (editId) {
                await axios.put(`http://localhost:5001/api/production/${editId}`, payload);
                alert('Record updated successfully!');
            } else {
                await axios.post('http://localhost:5001/api/production', payload);
                alert('Record created successfully!');
            }

            resetForm();
            fetchProductions();
        } catch (error) {
            console.error('Error saving production:', error);
        }
    };

    // Edit a production
    const handleEdit = (production) => {
        setMachineId(production.machineId);
        setCycleTime(production.CycleTime);
        setPlannedQty(production.PlannedQty);
        setPartName(production.PartName);
        setPlanDescription(production.PlanDescription);
        setEditId(production._id);
        setShowForm(true);
    };

    // Delete a production
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this record?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5001/api/production/${id}`);
                alert('Record deleted successfully!');
                fetchProductions();
            } catch (error) {
                console.error('Error deleting production:', error);
            }
        }
    };

    // Reset form fields
    const resetForm = () => {
        setMachineId('');
        setCycleTime('');
        setPlannedQty('');
        setPartName('');
        setPlanDescription('');
        setEditId(null);
        setShowForm(false);
    };

    // Show the form for adding a new production
    const handleAddClick = () => {
        resetForm();
        setShowForm(true);
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
        <div className="container mt-4">
            <h2>Production Manager</h2>

            {!showForm && (
                <button className="btn btn-primary mb-3" onClick={handleAddClick}>
                    Add New Production
                </button>
            )}

            {showForm && (
                <div>
                    <div className="row mb-3">
                        <div className="col-md-4 mb-3">
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
                        <div className="col-md-4 mb-3">
                            <label htmlFor="cycleTime">Cycle Time (seconds)</label>
                            <input
                                id="cycleTime"
                                type="number"
                                className="form-control"
                                value={cycleTime}
                                onChange={(e) => setCycleTime(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="plannedQty">Planned Quantity</label>
                            <input
                                id="plannedQty"
                                type="number"
                                className="form-control"
                                value={plannedQty}
                                onChange={(e) => setPlannedQty(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="partName">Part Name</label>
                            <select
                                id="partName"
                                className="form-control"
                                value={partName}
                                onChange={(e) => setPartName(e.target.value)}
                            >
                                <option value="">--Select Part Name--</option>
                                {partNames.map((name, index) => (
                                    <option key={index} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="planDescription">Plan Description</label>
                            <input
                                id="planDescription"
                                type="text"
                                className="form-control"
                                value={planDescription}
                                onChange={(e) => setPlanDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    <button className="btn btn-primary mb-3" onClick={handleAddOrUpdate}>
                        {editId ? 'Update' : 'Add'}
                    </button>
                    <button className="btn btn-secondary mb-3" onClick={resetForm}>
                        Cancel
                    </button>
                </div>
            )}

            {!showForm && (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Machine Name</th>
                            <th>Cycle Time (seconds)</th>
                            <th>Planned Quantity</th>
                            <th>Part Name</th>
                            <th>Plan Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productions.length > 0 ? (
                            productions.map((production) => (
                                <tr key={production._id}>
                                    <td>{production.machineId}</td>
                                    <td>{production.CycleTime}</td>
                                    <td>{production.PlannedQty}</td>
                                    <td>{production.PartName}</td>
                                    <td>{production.PlanDescription}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm mr-2"
                                            onClick={() => handleEdit(production)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(production._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No productions found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductionManager;
