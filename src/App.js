import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import Login from './pages/auth/Login';
import StudentOnboardForm from './pages/student/StudentOnboard';
import UniversityOnboardForm from './pages/university/UniversityOnboard';
import UniversitySetting from './pages/university/UniversitySetting';
import UniversityDashboard from './pages/university/UniversityDashboard';
import UniversityApplication from './pages/university/UniversityApplication';
import StudentSetting from './pages/student/StudentSetting';
import StudentDashboard from './pages/student/StudentDashboard';
import UniversityList from './pages/student/UniversityList';
import YourApplications from './pages/student/YourApplications';
import RoleSelection from './components/auth/RoleSelection';
import StudentSignup from './pages/auth/StudentSignup';
import UniversitySignup from './pages/auth/UniversitySignup';
import ProtectedRoute from './utils/ProtectedRoute';
import UniversityDetails from './components/UniversityDetails';
import StudentProfile from './pages/student/StudentProfile';
import UniversityProfile from './pages/university/UniversityProfile';
import CourseDetails from './pages/student/CourseDetails';

function App() {
  return (
    <div className="App">
      <NextUIProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' Component={RoleSelection} />
            <Route path='/student-signup' Component={StudentSignup} />
            <Route path='/university-signup' Component={UniversitySignup} />
            <Route path='/login' Component={Login} />

            {/* Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route path='/student-onboard' Component={StudentOnboardForm} />
              <Route path="/university/:id" Component={UniversityDetails} />
              <Route path='/student-dashboard/Dashboard' Component={StudentDashboard} />
              <Route path='/student-dashboard/Universities' Component={UniversityList} />
              <Route path='/student-dashboard/Applications' Component={YourApplications} />
              <Route path='/student-dashboard/Setting' Component={StudentSetting} />
              <Route path='/student-dashboard/profile' Component={StudentProfile} />
              <Route path='/university/course-details/:id' Component={CourseDetails} />
            </Route>

            {/* University Routes */}
            <Route element={<ProtectedRoute allowedRoles={['university']} />}>
              <Route path="/university/:id" Component={UniversityDetails} />
              <Route path='/university-onboard' Component={UniversityOnboardForm} />
              <Route path='/university-dashboard/Setting' Component={UniversitySetting} />
              <Route path='/university-dashboard/Application' Component={UniversityApplication} />
              <Route path='/university-dashboard/Dashboard' Component={UniversityDashboard} />
              <Route path='/university-dashboard/profile' Component={UniversityProfile} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </div>
  );
}

export default App;
