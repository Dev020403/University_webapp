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
import UniversityCourses from './pages/university/UniversityCourses';
import NotFound from './NotFound';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminUniversities from './admin/pages/AdminUniversities';
import AdminStudents from './admin/pages/AdminStudents';
import AdminSettings from './admin/pages/AdminSettings';
import AdminLogin from './admin/pages/AdminLogin';

function App() {
  return (
    <div className="App">
      <NextUIProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path='/' Component={LandingPage} />
            <Route path='/student-signup' Component={StudentSignup} />
            <Route path='/university-signup' Component={UniversitySignup} />
            <Route path='/signup' Component={RoleSelection} />
            <Route path='/login' Component={Login} />
            <Route path='*' Component={NotFound}></Route>

            {/* Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route path='/student-dashboard/dashboard' Component={StudentDashboard} />
              <Route path='/student-dashboard/universities' Component={UniversityList} />
              <Route path="/university/:id" Component={UniversityDetails} />
              <Route path='/student-onboard' Component={StudentOnboardForm} />
              <Route path='/university/course-details/:id' Component={CourseDetails} />
              <Route path='/student-dashboard/applications' Component={YourApplications} />
              <Route path='/student-dashboard/setting' Component={StudentSetting} />
              <Route path='/student-dashboard/profile' Component={StudentProfile} />
            </Route>

            {/* University Routes */}
            <Route element={<ProtectedRoute allowedRoles={['university']} />}>
              <Route path="/university/:id" Component={UniversityDetails} />
              <Route path='/university-onboard' Component={UniversityOnboardForm} />
              <Route path='/university-dashboard/setting' Component={UniversitySetting} />
              <Route path='/university-dashboard/application' Component={UniversityApplication} />
              <Route path='/university-dashboard/dashboard' Component={UniversityDashboard} />
              <Route path='/university-dashboard/profile' Component={UniversityProfile} />
              <Route path='/university-dashboard/courses' Component={UniversityCourses} />
            </Route>

            {/* Admin Routes */}
            <Route path='/admin/login' Component={AdminLogin} />
            <Route path='/admin-dashboard/dashboard' Component={AdminDashboard} />
            <Route path='/admin-dashboard/universities' Component={AdminUniversities} />
            <Route path='/admin-dashboard/students' Component={AdminStudents} />
            <Route path='/admin-dashboard/setting' Component={AdminSettings} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </div>
  );
}

export default App;
