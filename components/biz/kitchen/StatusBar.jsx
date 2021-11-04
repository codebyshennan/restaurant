import React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import KitchenIcon from '@mui/icons-material/Kitchen';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Badge from '@mui/material/Badge';
import { DateTime } from 'luxon'


const StatusBar = ({orders}) => {

  const openOrders = orders && orders.filter(order=> order.status == "processing")
  const openOrdersQty = orders && openOrders.length
  const closedOrders = orders && orders.filter(order => order.status == "completed")
  const closedOrdersQty = orders && closedOrders.length

  const fulfilmentTime = orders && closedOrders.reduce((accumulator, current)=> {
    let timeTaken = 0
    if (current.completed_at) {
      const orderedTime = DateTime.fromISO(current.created_at)
      const completedTime = DateTime.fromISO(current.completed_at)
      timeTaken = completedTime.diff(orderedTime).toObject()
    } 

    return accumulator + timeTaken.milliseconds/1000/60
  }, 0) / closedOrdersQty

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
     <BottomNavigation showLabels>
       <BottomNavigationAction
        label="Completed Today"
        value="completed"
        icon={ <Badge badgeContent={closedOrdersQty} color="secondary">
                <AssignmentTurnedInIcon color="action" />
              </Badge> }
      />
      
      <BottomNavigationAction
        label="Open Orders"
        value="open"
        icon={<Badge badgeContent={openOrdersQty} color="secondary">
                <KitchenIcon color="action" />
              </Badge>}
      />
      <BottomNavigationAction
        label="Fulfilment Rate"
        value="fulfilmentRate"
        icon={"16.4/hr"}
      />
      <BottomNavigationAction label="Avg Time" value="folder" icon={fulfilmentTime} />
    </BottomNavigation>
    </Paper>
  )
}

export default StatusBar
