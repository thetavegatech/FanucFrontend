import React, { useEffect, useState } from 'react';

const ShowOnDash = () => {
  const [machineData, setMachineData] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [totalPartsProduced, setTotalPartsProduced] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMachineData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/machine-data/ORG001/allpro');
        if (!response.ok) {
          throw new Error('Failed to fetch machine data');
        }
        const data = await response.json();
        setMachineData(data);
        
        // Count Active and Inactive machines
        const activeMachines = data.filter(machine => machine.status === 'ACTIVE').length;
        const inactiveMachines = data.filter(machine => machine.status === 'INACTIVE').length;

        // Calculate the sum of TotalPartsProduced
        const totalParts = data.reduce((sum, machine) => {
          return sum + (machine.latestProductionData?.TotalPartsProduced || 0);
        }, 0);

        // Update state
        setActiveCount(activeMachines);
        setInactiveCount(inactiveMachines);
        setTotalPartsProduced(totalParts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMachineData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Machine Status</h1>
      <p>Active Machines: {activeCount}</p>
      <p>Inactive Machines: {inactiveCount}</p>
      <p>Total Parts Produced: {totalPartsProduced}</p>
      
      <ul>
        {machineData.map(machine => (
          <li key={machine.machineId}>
            {machine.machineId}: {machine.status}, Parts Produced: {machine.latestProductionData?.TotalPartsProduced || 0}
          </li>
        ))}
      </ul>
    </div>
  );
};



export default ShowOnDash