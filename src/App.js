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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CncMachineform />} />
        <Route path='/breakdownform' element={<BreakdownForm />} />
        <Route path='/maintenancescheduleform' element={<MaintenanceScheduleForm />} />
        <Route path='/PartForm' element={<PartForm />} />
        <Route path='/Skillsform' element={<Skillsform />} />
        <Route path='/WorkForceForm' element={<WorkForceForm />} />
        <Route path='/ProductionPlanform' element={<ProductionPlanform />} />
        <Route path='/Toollifeform' element={<Toollifeform />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
