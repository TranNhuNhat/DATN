import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import HomestayAdmin from './HomestayAdmin/HomestayAdmin';
import BookingAdmin from './BookingAdmin/BookingAdmin';
import RoomAdmin from './RoomAdmin/RoomAdmin';
import EvaluateAdmin from './EvaluateAdmin/EvaluateAdmin';





const AdminTabs = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div>
        <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Homestay" value="1" />
            <Tab label="Đơn đặt phòng" value="2" />
            <Tab label="Phòng" value="3" />
            <Tab label="Đánh giá" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <HomestayAdmin/>
        </TabPanel>
        <TabPanel value="2">
          <BookingAdmin/>
        </TabPanel>
        <TabPanel value="3">
          <RoomAdmin/>
        </TabPanel>
        <TabPanel value="4">
          <EvaluateAdmin/>
        </TabPanel>
        
      </TabContext>
    </Box>
    </div>
  )
}

export default AdminTabs