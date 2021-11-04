
import Radio from '@mui/material/Radio';
import React, {useState} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const LayoutSettings = () => {
  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Text Size</ListSubheader>}
    >
      <ListItem>
        <ListItemText id="newticket" primary="Small" />
         <Radio edge="end" value="small"/>
      </ListItem>
      <ListItem>
        <ListItemText id="newticket" primary="Medium" />
         <Radio edge="end" value="medium"/>
      </ListItem>
      <ListItem>
        <ListItemText id="newticket" primary="Large" />
         <Radio edge="end" value="medium"/>
      </ListItem>
    </List>
  )
}

export default LayoutSettings
