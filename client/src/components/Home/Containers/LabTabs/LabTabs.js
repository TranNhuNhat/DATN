import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import HomePage from './Panel/HomePage/HomePage';
import DetailPage from './Panel/DetailPage/DetailPage';

const LabTabs = () => {
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
              <Tab label="Trang chủ " value="1" />
              <Tab label="Quận Ba Đình" value="2" />
              <Tab label="Quận Hoàn Kiếm" value="3" />
              <Tab label="Quận Tây Hồ" value="4" />
              <Tab label="Quận Đống Đa" value="5" />
              <Tab label="Quận Thanh Xuân" value="6" />
              <Tab label="Quận Hai Bà Trưng " value="7" />
              <Tab label="Quận Hà Đông" value="8" />
              <Tab label="Quận Cầu Giấy" value="9" />
              <Tab label="Quận Long Biên" value="10" />
            </TabList>
          </Box>
          <TabPanel value="1">
              <HomePage/>
          </TabPanel>
          <TabPanel value="2">
              <DetailPage district="Ba Đình"/>
          </TabPanel>
          <TabPanel value="3">
              <DetailPage district="Hoàn Kiếm"/>
          </TabPanel>
          <TabPanel value="4">
              <DetailPage district="Tây Hồ"/>
          </TabPanel>
          <TabPanel value="5">
              <DetailPage district="Đống Đa"/>
          </TabPanel>
          <TabPanel value="6">
              <DetailPage district="Thanh Xuân"/>
          </TabPanel>
          <TabPanel value="7">
              <DetailPage district="Hai Bà Trưng"/>
          </TabPanel>
          <TabPanel value="8">
              <DetailPage district="Hà Đông"/>
          </TabPanel>
          <TabPanel value="9">
              <DetailPage district="Cầu Giấy"/>
          </TabPanel>
          <TabPanel value="10">
              <DetailPage district="Long Biên"/>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  )
}

export default LabTabs