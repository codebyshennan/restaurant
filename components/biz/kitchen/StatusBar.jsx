import React from 'react'
import PaginationBar from './PaginationBar'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import KitchenIcon from '@mui/icons-material/Kitchen';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Badge from '@mui/material/Badge';


const StatusBar = () => {

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
     <BottomNavigation showLabels>
       <BottomNavigationAction
        label="Completed Today"
        value="completed"
        icon={ <Badge badgeContent={300} color="secondary">
                <AssignmentTurnedInIcon color="action" />
              </Badge> }
      />
      
      <BottomNavigationAction
        label="Open Orders"
        value="open"
        icon={<Badge badgeContent={4} color="secondary">
                <KitchenIcon color="action" />
              </Badge>}
      />
      <PaginationBar />
      <BottomNavigationAction
        label="Fulfilment Rate"
        value="fulfilmentRate"
        icon={"16.4/hr"}
      />
      <BottomNavigationAction label="Avg Time" value="folder" icon={"12:31"} />
    </BottomNavigation>
    </Paper>
  )
}

export default StatusBar
