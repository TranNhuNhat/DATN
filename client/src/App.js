import './App.css';
import Home from './components/Home/Home';
import { Routes, Route } from 'react-router-dom';
import Admin from './components/Admin/Admin';
import EditHomestay from './components/Admin/ContainerAdmin/AdminTabs/HomestayAdmin/EditHomestay/EditHomestay';
import EditRoom from './components/Admin/ContainerAdmin/AdminTabs/RoomAdmin/EditRoom';
import EditBookingAdmin from './components/Admin/ContainerAdmin/AdminTabs/BookingAdmin/EditBookingAdmin';
import HomestayDetail from './components/Home/Containers/LabTabs/Panel/HomestayDetail/HomestayDetail';


function App() {
  return (
    <Routes >
      <Route path='/' element={<Home />}/>
      <Route path='/admin' element={<Admin />}/>
      <Route path='/admin/editHomestay/:id' element={<EditHomestay />}/>
      <Route path='/admin/editRoom/:id' element={<EditRoom />}/>
      <Route path='/admin/editBooking/:id' element={<EditBookingAdmin />}/>
      <Route path='/home/HomestayDetail/:id' element={<HomestayDetail />}/>
    </Routes>
  );
}

export default App;
