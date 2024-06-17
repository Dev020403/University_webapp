import './App.css';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentOnboardForm from './pages/student/StudentOnboard';
import UniversityOnboardForm from './pages/university/UniversityOnboard';
import UniversitySetting from './pages/university/UniversitySetting'
import UniversityDashboard from './pages/university/UniversityDashboard'
import UniversityApplication from './pages/university/UniversityApplication'
import { NextUIProvider } from '@nextui-org/react';
import StudentSetting from './pages/student/StudentSetting';
import StudentDashboard from './pages/student/StudentDashboard';
import UniversityList from './pages/student/UniversityList';
import YourApplications from './pages/student/YourApplications'
function App() {
  return (
    <div className="App">
      <NextUIProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' Component={Signup}></Route>
            <Route path='/login' Component={Login}></Route>

            <Route path='/student-onboard' Component={StudentOnboardForm}></Route>
            <Route path='/student-dashboard/Dashboard' Component={StudentDashboard}></Route>
            <Route path='/student-dashboard/Universities' Component={UniversityList}></Route>
            <Route path='/student-dashboard/Applications' Component={YourApplications}></Route>
            <Route path='/student-dashboard/Setting' Component={StudentSetting}></Route>

            <Route path='/university-onboard' Component={UniversityOnboardForm}></Route>
            <Route path='/university-dashboard/Setting' Component={UniversitySetting}></Route>
            <Route path='/university-dashboard/Application' Component={UniversityApplication}></Route>
            <Route path='/university-dashboard/Dashboard' Component={UniversityDashboard}></Route>

          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </div>
  );
}

export default App;
