import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMachine } from '../store/machineSlice'; // Import the fetchMachine thunk

const forredux = () => {
    const dispatch = useDispatch();
    const { machine, loading, error } = useSelector((state) => state.machine);

    useEffect(() => {
        const machineId = 'MACHINE001'; // Static machineId as per your requirement
        dispatch(fetchMachine(machineId));
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Machine Details</h1>
            <p><strong>Machine ID:</strong> {machine.machineId}</p>
            <p><strong>Organization ID:</strong> {machine.organizationId}</p>
            <p><strong>Asset ID:</strong> {machine.assetId}</p>
            <p><strong>Machine Name:</strong> {machine.machineName}</p>
            <p><strong>Machine Type:</strong> {machine.machineType}</p>
            <p><strong>Status:</strong> {machine.status}</p>
            <p><strong>Location:</strong> {machine.location}</p>
            <p><strong>Assigned Operator:</strong> {machine.AssignedOperator}</p>
            {/* Render more fields as needed */}
        </div>
    );
};




export default forredux