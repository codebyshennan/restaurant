import React, { useEffect } from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'

import DiningIcon from '../../../components/biz/kitchen/DiningIcon'

const OrderList = ( { orderCompletion, setOrderCompletion } ) => {


  const handleOnClick = (index) => {
    const tempList = [...orderCompletion]
    tempList.splice(index,1)
    setOrderCompletion(tempList)
    // await fetch('/api/kitchen/updateOrderItem', { method:"UPDATE", body})
  }


  const list = orderCompletion.map( (item, idx) => {
                return (
                    <ListItemButton style={{width: '17rem'}} selected={ item.status == "completed"} key = { item._id+idx } onClick={()=> handleOnClick(idx)} >

                      <ListItemAvatar>
                        <Avatar>
                          <DiningIcon type = { item.type } />
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText
                        primary = { <Typography noWrap> {item.name} </Typography> }
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