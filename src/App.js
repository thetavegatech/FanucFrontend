import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CncMachineform from './Components/CncMachineform';
import BreakdownForm from './Components/BreakdownForm';
import MaintenanceScheduleForm from './Components/MaintenanceScheduleform';
import PartForm from './Components/Part';
import Skillsform from './Components/Skillsform';
import WorkForceForm from './Components/WorkForceform';
import ProductionPlanform from './Components/ProductionPlanform';
import Toollifeform from './Components/Toolslifeform';
import TPMSForm from './Components/Tpmsform';
import Shiftform from './Components/Shiftform';
import PmcParameterform from './Components/PmcParameterform';
import OperatorPerformanceform from './Components/OperatorPerformanceform';
// import { Provider } from 'react-redux';
// import store from './store/store'; // Import the Redux store
 import Navbar from './Components/Navbar';
 import Elementform from './Components/Elementform';
 import ShowOnDash from './Components/ShowOnDash';

function App() {
  return (
    // <Provider store={store}>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<CncMachineform />} />
        <Route path='/breakdownform' element={<BreakdownForm />} />
        <Route path='/maintenancescheduleform' element={<MaintenanceScheduleForm />} />
        <Route path='/PartForm' element={<PartForm />} />
        <Route path='/Skillsform' element={<Skillsform />} />
        <Route path='/WorkForceForm' element={<WorkForceForm />} />
        <Route path='/ProductionPlanform' element={<ProductionPlanform />} />
        <Route path='/Toollifeform' element={<Toollifeform />} />
        <Route path='/tpmsform' element={<TPMSForm />} />
        <Route path='/Shiftform' element={<Shiftform />} />
        <Route path='/PmcParameterform' element={<PmcParameterform />} />
        <Route path='/OperatorPerformanceform' element={<OperatorPerformanceform />} />
        <Route path='/Elementform' element={<Elementform />} />
        <Route path='/ShowOnDash' element={<ShowOnDash />} />
      </Routes>
    </BrowserRouter>
  // </Provider>
  );
}

export default App;
