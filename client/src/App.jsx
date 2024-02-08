import './App.css'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes';
import PublicRoutes from './components/PublicRoutes';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';
import ApplyAsDoctor from './components/applyasdoctor/ApplyAsDoctor';
import ApplyDoctor from './components/applydoctor/ApplyDoctor';
import UpdateUser from './components/updateuser/UpdateUser';
import Notifications from './components/notifications/Notifications';
import NewDoctor from './components/newdoctor/NewDoctor';
import AllUsers from './components/allusers/AllUsers';
import AllDoctors from './components/alldoctors/AllDoctors';
import Appointments from './components/appointments/Appointments';
import BookingDc from './components/bookingdc/BookingDc'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PrivateRoutes><Home /></PrivateRoutes>} >
          <Route path="/" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
          <Route path='/applyasdoctor' element={<PrivateRoutes><ApplyAsDoctor /></PrivateRoutes>} />
          <Route path='/update' element={<PrivateRoutes><UpdateUser /></PrivateRoutes>} />
          <Route path='/newdoctors' element={<PrivateRoutes><NewDoctor /></PrivateRoutes>} />
          <Route path='/profileDoctor' element={<PrivateRoutes><Profiles /></PrivateRoutes>} />
          <Route path='/notifications' element={<PrivateRoutes><Notifications /></PrivateRoutes>} />
          <Route path='/allusers' element={<PrivateRoutes><AllUsers /></PrivateRoutes>} />
          <Route path='/alldoctors' element={<PrivateRoutes><AllDoctors /></PrivateRoutes>} />
          <Route path='/applydoctor' element={<PrivateRoutes><ApplyDoctor /></PrivateRoutes>} />
          <Route path='/apbooking' element={<PrivateRoutes><BookingDc /></PrivateRoutes>} />
          <Route path='/appointments' element={<PrivateRoutes><Appointments /></PrivateRoutes>} />
        </Route>
        <Route path='/login' element={<PublicRoutes><Login /></PublicRoutes>} />
        <Route path='/register' element={<PublicRoutes><Register /></PublicRoutes>} />
      </Routes>
    </BrowserRouter>
  )
}

