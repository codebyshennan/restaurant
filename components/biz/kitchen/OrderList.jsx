import React, { useEffect } from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton'

import DiningIcon from '../../../components/biz/kitchen/DiningIcon'

const OrderList = ( { orderList } ) => {


  const handleOnClick = (event) => {
    console.log(event)
    // await fetch('/api/kitchen/updateOrderItem', { method:"UPDATE", body})
  }


  const list = orderList.map( item => {
                return (
                    <ListItemButton selected={ item.status == "completed"} key = { item._id } altKey = { item._id } onClick={handleOnClick} >

                      <ListItemAvatar>
                        <Avatar>
                          <DiningIcon type = { item.type } />
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText
                        primary = { item.name }
                        secondary = { <ul>
                          { item.ingredients && item.ingredients.map(ingredient => {
                              return ingredient.quantity > 0 
                              &&
                               (<li key={ingredient.name}> {ingredient.name} x { ingredient.quantity} </li>)
                                 }
                            ) } 
                        </ul> }
                      />
                    </ListItemButton>

                  )
                }) 
                
  return (
    <>
      { list }
      <Divider variant="inset" component="li" />
    </>
    )              
  }

export default OrderList