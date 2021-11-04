import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';


const GeneralSettings = () => {
  return (
    <List
      sx={{ bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Settings</ListSubheader>}
    >
      <ListItem>
        <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
        test
      </ListItem>
      <ListItem>
        <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
        test
      </ListItem>
    </List>
  )
}

export default GeneralSettings
