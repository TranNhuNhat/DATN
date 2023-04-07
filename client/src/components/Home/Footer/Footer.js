import React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import Box from '@mui/material/Box';

const actions = [
    { icon: <PhoneIcon />, name: '0123456789' },
    { icon: <EmailIcon />, name: 'support@gmail.com' },
    { icon: <BusinessIcon />, name: '43 Nguyễn Chí Thanh,Ba Đình,Hà Nội' },
  ];

const Footer = () => {
  return (
    <div>
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
        >
            {actions.map((action) => (
            <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
            />
            ))}
        </SpeedDial>
        </Box>
    </div>
  )
}

export default Footer