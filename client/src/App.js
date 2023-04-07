import './App.css';
import Home from './components/Home/Home';
import { Routes, Route } from 'react-router-dom';
import Admin from './components/Admin/Admin';
import EditHomestay from './components/Admin/ContainerAdmin/AdminTabs/HomestayAdmin/EditHomestay/EditHomestay';
import EditRoom from './components/Admin/ContainerAdmin/AdminTabs/RoomAdmin/EditRoom';
import EditRoomtypeAdmin from './components/Admin/ContainerAdmin/AdminTabs/RoomtypeAdmin/EditRoomtypeAdmin';
import EditBookingAdmin from './components/Admin/ContainerAdmin/AdminTabs/BookingAdmin/EditBookingAdmin';


function App() {
  return (
    <Routes >
      <Route path='/' element={<Home />}/>
      <Route path='/admin' element={<Admin />}/>
      <Route path='/admin/editHomestay/:id' element={<EditHomestay />}/>
      <Route path='/admin/editRoom/:id' element={<EditRoom />}/>
      <Route path='/admin/editRoomtype/:id' element={<EditRoomtypeAdmin />}/>
      <Route path='/admin/editBooking/:id' element={<EditBookingAdmin />}/>
    </Routes>
  );
}

export default App;
