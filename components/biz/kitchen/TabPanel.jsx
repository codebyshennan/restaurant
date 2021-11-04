import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GeneralSettings from './GeneralSettings';
import TimerSettings from './TimerSettings'
import LayoutSettings from './LayoutSettings'

const TabPanel = (props) =>{
  const { children, value, index, ...others } = props

  return (
    <div role="tabpanel" hidden={value !==index } id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...others} >

      { value === index && (
        <Box sx={{p:3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex', marginTop:2 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label=""
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="General" {...a11yProps(0)} />
        <Tab label="Timers & Alerts" {...a11yProps(1)} />
        <Tab label="Layout" {...a11yProps(2)} />
      </Tabs>
      <TabPanel className="w-full" value={value} index={0}>
       <GeneralSettings />
      </TabPanel>
      <TabPanel className="w-full" value={value} index={1}>
        <TimerSettings />
      </TabPanel> 
      <TabPanel className="w-full" value={value} index={2}>
        <LayoutSettings />
      </TabPanel>
    </Box>
  );
}