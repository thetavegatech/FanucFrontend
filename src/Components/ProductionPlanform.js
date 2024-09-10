import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductionManager = () => {
    // Static machine ID
    const machineId = "1234"; // Example static machine ID

    const [productions, setProductions] = useState([]);
    const [partId, setPartId] = useState('');
    const [cycleTime, setCycleTime] = useState('');
    const [plannedQty, setPlannedQty] = useState('');
    const [partName, setPartName] = useState('');
    const [planDescription, setPlanDescription] = useState('');
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false); // New state to control form visibility

    useEffect(() => {
        fetchProductions(); // Fetch productions initially for the static machineId
    }, []);

    const fetchProductions = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/production', {
                params: { machineId }
            });
            setProductions(response.data);
        } catch (error) {
            console.error('Error fetching productions:', error);
        }
    };

    const handleAddOrUpdate = async () => {
        try {
            const payload = {
                machineId, // Use the static machine ID
                PartId: partId,
                CycleTime: cycleTime,
                PlannedQty: plannedQty,
                PartName: partName,
                PlanDescription: planDescription
            };

            if (editId) {
                await axios.put(`http://localhost:5001/api/production/${editId}`, payload);
            } else {
                await axios.post('http://localhost:5001/api/production', payload);
            }
            
            // Reset fields after submission
            resetForm();
            fetchProductions();
        } catch (error) {
            console.error('Error saving production:', error);
        }
    };

    const handleEdit = (production) => {
        setPartId(production.PartId);
        setCycleTime(production.CycleTime);
        setPlannedQty(production.PlannedQty);
        setPartName(production.PartName);
        setPlanDescription(production.PlanDescription);
        setEditId(production._id);
        setShowForm(true); // Show form when editing
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/production/${id}`);
            fetchProductions();
        } catch (error) {
            console.error('Error deleting production:', error);
        }
    };

    const resetForm = () => {
        setPartId('');
        setCycleTime('');
        setPlannedQty('');
        setPartName('');
        setPlanDescription('');
        setEditId(null);
        setShowForm(false); // Hide form after reset
    };

    const handleAddClick = () => {
        resetForm();
        setShowForm(true); // Show form when adding new data
    };

    return (
        <div className="container mt-4">
            <h2>Production Manager</h2>

            {/* Button to Add New Production */}
            {!showForm && (
                <button className="btn btn-primary mb-3" onClick={handleAddClick}>
                    Add New Production
                </button>
            )}

            {/* Conditionally render form */}
            {showForm && (
                <div>
                    <div className="row mb-3">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="partId">Part ID</label>
                            <input
                                id="partId"
                                type="text"
                                className="form-control"
                                value={partId}
                                onChange={(e) => setPartId(e.target.value)}
                            />
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
                            <input
                                id="partName"
                                type="text"
                                className="form-control"
                                value={partName}
                                onChange={(e) => setPartName(e.target.value)}
                            />
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

                    {/* Add/Update button */}
                    <button className="btn btn-primary mb-3" onClick={handleAddOrUpdate}>
                        {editId ? 'Update' : 'Add'}
                    </button>
                    <button className="btn btn-secondary mb-3" onClick={resetForm}>
                        Cancel
                    </button>
                </div>
            )}

            {/* Productions table */}
            {!showForm && (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Part ID</th>
                            <th>Cycle Time (seconds)</th>
                            <th>Planned Quantity</th>
                            <th>Part Name</th>
                            <th>Plan Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productions.length > 0 ? (
                            productions.map(production => (
                                <tr key={production._id}>
                                    <td>{production.PartId}</td>
                                    <td>{production.CycleTime}</td>
                                    <td>{production.PlannedQty}</td>
                                    <td>{production.PartName}</td>
                                    <td>{production.PlanDescription}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEdit(production)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(production._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No productions found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductionManager;
