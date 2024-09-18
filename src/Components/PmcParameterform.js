// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// // Utility function to format date for datetime-local input
// const formatDateForInput = (dateString) => {
//   const date = new Date(dateString);
//   const offset = date.getTimezoneOffset();
//   const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
//   return adjustedDate.toISOString().slice(0, 16); // Format to 'YYYY-MM-DDTHH:MM'
// };

// const PmcParameterform = () => {
//   const [parameters, setParameters] = useState([]); // Ensure initial state is an array
//   const [parameterForm, setParameterForm] = useState({
//     parameterName: '',
//     parameterAddress: '',
//     parameterType: '',
//     dataType: '',
//     readCycle: '',
//     description: '',
//     timestamp: '',
//     MachineId: '',
//     byteValue: '', // New field to hold byte selection
//   });
//   const [showByteDropdown, setShowByteDropdown] = useState(false); // To show/hide byte dropdown
//   const [editingParameterId, setEditingParameterId] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   // Fetch PMC parameters data
//   const fetchParameters = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5001/api/pmc-parameters`);
//       if (Array.isArray(response.data)) {
//         setParameters(response.data);
//       } else {
//         console.error('API response is not an array:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching PMC parameters', error);
//     }
//   };

//   useEffect(() => {
//     fetchParameters();
//   }, []);

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setParameterForm({ ...parameterForm, [name]: value });

//     // Show or hide byte dropdown based on dataType selection
//     if (name === 'dataType' && value === 'byte') {
//       setShowByteDropdown(true);
//     } else if (name === 'dataType') {
//       setShowByteDropdown(false);
//     }
//   };

//   // Handle form submission
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingParameterId) {
//         await axios.put(`http://localhost:5001/api/pmc-parameters/${editingParameterId}`, parameterForm);
//         alert('Parameter updated successfully');
//       } else {
//         await axios.post('http://localhost:5001/api/pmc-parameters', parameterForm);
//         alert('Parameter created successfully');
//       }
//       fetchParameters();
//       resetForm();
//       setShowForm(false);
//     } catch (error) {
//       console.error('Error saving PMC parameter', error);
//     }
//   };

//   // Reset form
//   const resetForm = () => {
//     setParameterForm({
//       parameterName: '',
//       parameterAddress: '',
//       parameterType: '',
//       dataType: '',
//       readCycle: '',
//       description: '',
//       timestamp: '',
//       MachineId: '',
//       byteValue: '', // Reset byte value on form reset
//     });
//     setShowByteDropdown(false); // Hide byte dropdown when form resets
//     setEditingParameterId(null);
//   };

//   // Handle edit
//   const handleEdit = (parameter) => {
//     setParameterForm({
//       parameterName: parameter.parameterName,
//       parameterAddress: parameter.parameterAddress,
//       parameterType: parameter.parameterType,
//       dataType: parameter.dataType,
//       readCycle: parameter.readCycle,
//       description: parameter.description,
//       timestamp: formatDateForInput(parameter.timestamp),
//       MachineId: parameter.MachineId,
//       byteValue: parameter.byteValue || '', // Include byteValue if editing
//     });
//     setEditingParameterId(parameter._id);
//     setShowForm(true);
//     if (parameter.dataType === 'byte') {
//       setShowByteDropdown(true);
//     }
//   };

//   // Handle delete
//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this parameter?')) {
//       try {
//         await axios.delete(`http://localhost:5001/api/pmc-parameters/${id}`);
//         alert('Parameter deleted successfully');
//         fetchParameters();
//       } catch (error) {
//         console.error('Error deleting PMC parameter', error);
//       }
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="mt-4">PMC Parameters Manager</h2>
//       {!showForm ? (
//         <>
//           <button className="btn btn-primary mb-3" onClick={() => setShowForm(true)}>
//             Add Parameter
//           </button>

//           <table className="table mt-4">
//             <thead>
//               <tr>
//                 <th scope="col">Parameter Name</th>
//                 <th scope="col">Parameter Address</th>
//                 <th scope="col">Parameter Type</th>
//                 <th scope="col">Data Type</th>
//                 <th scope="col">Read Cycle</th>
//                 <th scope="col">Description</th>
//                 <th scope="col">Timestamp</th>
//                 <th scope="col">Machine ID</th>
//                 <th scope="col">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {parameters.length > 0 ? (
//                 parameters.map((parameter) => (
//                   <tr key={parameter._id}>
//                     <td>{parameter.parameterName}</td>
//                     <td>{parameter.parameterAddress}</td>
//                     <td>{parameter.parameterType}</td>
//                     <td>{parameter.dataType}</td>
//                     <td>{parameter.readCycle}</td>
//                     <td>{parameter.description}</td>
//                     <td>{new Date(parameter.timestamp).toLocaleString()}</td>
//                     <td>{parameter.MachineId}</td>
//                     <td>
//                       <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(parameter)}>
//                         Edit
//                       </button>
//                       <button className="btn btn-danger btn-sm" onClick={() => handleDelete(parameter._id)}>
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="10">No parameters available</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </>
//       ) : (
//         <form onSubmit={handleFormSubmit} className="row g-3">
//           {/* Parameter Name */}
//           <div className="col-md-4">
//             <label className="form-label">Parameter Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="parameterName"
//               value={parameterForm.parameterName}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           {/* Parameter Address */}
//           <div className="col-md-4">
//             <label className="form-label">Parameter Address</label>
//             <input
//               type="text"
//               className="form-control"
//               name="parameterAddress"
//               value={parameterForm.parameterAddress}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           {/* Parameter Type */}
//           <div className="col-md-4">
//             <label className="form-label">Parameter Type</label>
//             <input
//               type="text"
//               className="form-control"
//               name="parameterType"
//               value={parameterForm.parameterType}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           {/* Data Type */}
//           <div className="col-md-4">
//             <label className="form-label">Data Type</label>
//             <select
//               className="form-select"
//               name="dataType"
//               value={parameterForm.dataType}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">Select Data Type</option>
//               <option value="int">int</option>
//               <option value="float">float</option>
//               <option value="char">char</option>
//               <option value="byte">byte</option>
//             </select>
//           </div>

//           {/* Conditional Byte Dropdown */}
//           {showByteDropdown && (
//             <div className="col-md-4">
//               <label className="form-label">Byte Value</label>
//               <select
//                 className="form-select"
//                 name="byteValue"
//                 value={parameterForm.byteValue}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="">Select Byte Value</option>
//                 {[...Array(8).keys()].map((value) => (
//                   <option key={value} value={value}>
//                     {value}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {/* Read Cycle */}
//           <div className="col-md-4">
//             <label className="form-label">Read Cycle</label>
//             <input
//               type="number"
//               className="form-control"
//               name="readCycle"
//               value={parameterForm.readCycle}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           {/* Description */}
//           <div className="col-md-4">
//             <label className="form-label">Description</label>
//             <input
//               type="text"
//               className="form-control"
//               name="description"
//               value={parameterForm.description}
//               onChange={handleInputChange}
//             />
//           </div>

//           {/* Timestamp */}
//           <div className="col-md-4">
//             <label className="form-label">Timestamp</label>
//             <input
//               type="datetime-local"
//               className="form-control"
//               name="timestamp"
//               value={parameterForm.timestamp}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           {/* Machine ID */}
//           <div className="col-md-4">
//             <label className="form-label">Machine ID</label>
//             <input
//               type="text"
//               className="form-control"
//               name="MachineId"
//               value={parameterForm.MachineId}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           {/* Form Buttons */}
//           <div className="col-12">
//             <button type="submit" className="btn btn-primary">
//               {editingParameterId ? 'Update Parameter' : 'Add Parameter'}
//             </button>
//             <button
//               type="button"
//               className="btn btn-secondary ms-2"
//               onClick={() => {
//                 resetForm();
//                 setShowForm(false);
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default PmcParameterform;


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
    byteValue: '',
  });
  const [machineIds, setMachineIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showByteDropdown, setShowByteDropdown] = useState(false);
  const [editingParameterId, setEditingParameterId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch PMC parameters data
  const fetchParameters = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/pmc-parameters`);
      setParameters(response.data);
    } catch (error) {
      console.error('Error fetching PMC parameters', error);
    }
  };

  // Fetch machine IDs from API
  const fetchMachineData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/machines/ORG001');
      const machineIds = response.data.map(machine => machine.machineId); // Extract machine IDs
      setMachineIds(machineIds); // Set machine IDs in state
      setLoading(false); // Set loading to false after data is loaded
    } catch (err) {
      setError('Error fetching machine data');
      setLoading(false); // Ensure loading is stopped in case of an error
    }
  };

  useEffect(() => {
    fetchParameters();
    fetchMachineData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParameterForm({ ...parameterForm, [name]: value });

    // Show or hide byte dropdown based on dataType selection
    if (name === 'dataType' && value === 'byte') {
      setShowByteDropdown(true);
    } else if (name === 'dataType') {
      setShowByteDropdown(false);
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingParameterId) {
        await axios.put(`http://localhost:5001/api/pmc-parameters/${editingParameterId}`, parameterForm);
        alert('Parameter updated successfully');
      } else {
        await axios.post('http://localhost:5001/api/pmc-parameters', parameterForm);
        alert('Parameter created successfully');
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
      byteValue: '', // Reset byte value on form reset
    });
    setShowByteDropdown(false); // Hide byte dropdown when form resets
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
      byteValue: parameter.byteValue || '', // Include byteValue if editing
    });
    setEditingParameterId(parameter._id);
    setShowForm(true);
    if (parameter.dataType === 'byte') {
      setShowByteDropdown(true);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this parameter?')) {
      try {
        await axios.delete(`http://localhost:5001/api/pmc-parameters/${id}`);
        alert('Parameter deleted successfully');
        fetchParameters();
      } catch (error) {
        console.error('Error deleting PMC parameter', error);
      }
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
                <th scope="col">ByteValue</th>
                <th scope="col">ReadCycle</th>
                <th scope="col">Description</th>
                <th scope="col">Timestamp</th>
                <th scope="col">MachineID</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parameters.length > 0 ? (
                parameters.map((parameter) => (
                  <tr key={parameter._id}>
                    <td>{parameter.parameterName}</td>
                    <td>{parameter.parameterAddress}</td>
                    <td>{parameter.parameterType}</td>
                    <td>{parameter.dataType}</td>
                    <td>{parameter.byteValue}</td>
                    <td>{parameter.readCycle}</td>
                    <td>{parameter.description}</td>
                    <td>{new Date(parameter.timestamp).toLocaleString()}</td>
                    <td>{parameter.MachineId}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(parameter)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(parameter._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No parameters available</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : (
        <form onSubmit={handleFormSubmit} className="row g-3">
          {/* Parameter Name */}
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

          {/* Parameter Address */}
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

          {/* Parameter Type */}
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

          {/* Data Type */}
          <div className="col-md-4">
            <label className="form-label">Data Type</label>
            <select
              className="form-select"
              name="dataType"
              value={parameterForm.dataType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Data Type</option>
              <option value="int">int</option>
              <option value="float">float</option>
              <option value="char">char</option>
              <option value="byte">byte</option>
            </select>
          </div>

          {/* Conditional Byte Dropdown */}
          {showByteDropdown && (
            <div className="col-md-4">
              <label className="form-label">Byte Value</label>
              <select
                className="form-select"
                name="byteValue"
                value={parameterForm.byteValue}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Byte Value</option>
                {[...Array(8).keys()].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* Read Cycle */}
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

          {/* Description */}
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

          {/* Timestamp */}
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

          {/* Machine ID Dropdown */}
          <div className="col-md-4">
            <label className="form-label">Machine ID</label>
            <select
              className="form-select"
              name="MachineId"
              value={parameterForm.MachineId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Machine ID</option>
              {machineIds.length > 0 ? (
                machineIds.map((machineId) => (
                  <option key={machineId} value={machineId}>
                    {machineId}
                  </option>
                ))
              ) : (
                <option disabled>Loading Machine IDs...</option>
              )}
            </select>
          </div>

          {/* Form Buttons */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              {editingParameterId ? 'Update Parameter' : 'Add Parameter'}
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PmcParameterform;


