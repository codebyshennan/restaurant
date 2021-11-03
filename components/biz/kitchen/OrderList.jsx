import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider'

import DiningIcon from '../../../components/biz/kitchen/DiningIcon'

const OrderList = ( { orderList } ) => {


  const list = orderList.map( item => {
                return (
                    <ListItem key = { item._id } button >

                      <ListItemAvatar>
                        <Avatar>
                          <DiningIcon type = { item.type } />
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText
                        primary = { item.name }
                        secondary = { <ul>
                          { item.ingredients.map(ingredient => {
                              return (
                                <li key={ingredient.name}> {ingredient.name} x {ingredient.quantity} </li>
                              )
                            }) }
                        </ul> }
                      />
                    </ListItem>

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