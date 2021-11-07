import React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import KitchenIcon from '@mui/icons-material/Kitchen';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Badge from '@mui/material/Badge';
import { DateTime } from 'luxon'


const StatusBar = ({orders}) => {

  const openOrders = orders && orders.filter(order=> order.status == "processing" 
  && DateTime.fromISO(order.created_at).toFormat('MMMM dd, yyyy') == DateTime.now().toFormat('MMMM dd, yyyy'))

  const openOrdersQty = orders && openOrders.length

  const closedOrders = orders && orders.filter(order => order.status == "completed" 
  && DateTime.fromISO(order.created_at).toFormat('MMMM dd, yyyy') == DateTime.now().toFormat('MMMM dd, yyyy'))

  const closedOrdersQty = orders && closedOrders.length

  const fulfilmentTime = orders && closedOrders.reduce((accumulator, current)=> {
    let timeTaken = 0
    if (current.completed_at) {
      const orderedTime = DateTime.fromISO(current.created_at)
      const completedTime = DateTime.fromISO(current.completed_at)
      timeTaken = completedTime.diff(orderedTime).toObject()
    } 

    return accumulator + timeTaken.milliseconds/60000
  }, 0) / (closedOrdersQty || 1)

  const fulfilmentRate = (() => {
    const openingHoursObj = {...DateTime.now().toObject(), "hour": 9, "minute":0, "second": 0}
    const elapsedHours = DateTime.now().diff(DateTime.fromObject(openingHoursObj, {zone: 'Asia/Singapore'})).hours
    return closedOrdersQty/ (elapsedHours || 1 )
  })()

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
        icon={fulfilmentRate+"/hr"}
      />
      <BottomNavigationAction label="Avg Time" value="folder" icon={fulfilmentTime.toFixed(2) +"min/order"} />
    </BottomNavigation>
    </Paper>
  )
}

export default StatusBar
