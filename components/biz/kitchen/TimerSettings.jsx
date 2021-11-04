import React, {useState} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const TimerSettings = () => {
  const [checked, setChecked] = useState(['newticket']);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Play Sound When</ListSubheader>}
    >
      <ListItem
      >
        <ListItemIcon>
          <VolumeUpIcon />
        </ListItemIcon>
        <ListItemText id="newticket" primary="New Tickets Arrive" />
        <Switch
          edge="end"
          onChange={handleToggle('newticket')}
          checked={checked.indexOf('newticket') !== -1}
          inputProps={{
            'aria-labelledby': 'newticket',
          }}
        />
      </ListItem>
    </List>
  );
}

export default TimerSettings