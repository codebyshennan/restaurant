import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader'
import { green, red, white } from '@mui/material/colors';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Divider from '@mui/material/Divider'
import ListSubheader from '@mui/material/ListSubheader';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import HelpIcon from '@mui/icons-material/Help';
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DiningIcon from '../biz/kitchen/DiningIcon';
import LunchDiningIcon from '@mui/icons-material/LunchDining';

import { DateTime } from 'luxon'
import { minWidth } from '@mui/system';


const Receipt = ( { cartItems, cartPrice, queue} ) => {
  console.log(cartItems)
  const list = cartItems.map( (item, i) => {
                return (
                  <div key = { item._id } className='flex justify-between ml-2'>
                      <ListItemText className='mr-2'
                        primary = { item.name } 
                        secondary = { <ul>
                          { item.ingredients && item.ingredients.map(ingredient => {
                              return ingredient.quantity > 0 
                              &&
                               (<li key={ingredient.name}> {ingredient.name} x { ingredient.quantity} </li>)
                                 }
                            ) }
                        </ul>
                         }
                      />
                        <ListItemAvatar className='w-min'>
                        <p className='font-bold w-min mt-1'>${cartItems[i].price}</p>
                      </ListItemAvatar>
                    </div>
                  )
                }) 
     
  const [confirmClick, setConfirmClick] = useState(false)
  const [completeOrder, setCompleteOrder] = useState(false)

  const dateString = DateTime.fromISO(DateTime.local()).toFormat('MMMM dd, yyyy')
  const timeString = DateTime.fromISO(DateTime.local()).toLocaleString(DateTime.TIME_SIMPLE)

  const handleOnClick = (event) => {
    setConfirmClick(!confirmClick)
  }

  const DefaultHeader = () => {
    return (
      <CardHeader
          title={
            <Typography variant="h5" component={"div"}  >
              Order # {queue}
            </Typography>
          }
          subheader={
            <Typography variant="overline" component={"div"} >
              { 
                dateString
              }
            </Typography>
          } // date of receipt
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
               <FastfoodIcon />
            </Avatar>
          }
          // onClick={handleOnClick}
        />
    )
  }

  const Confirmation = () => {
    return (
      <CardHeader
          className="bg-green-500"
          title={
            <Typography className="text-white" variant="h5" component={"div"}>
              Receipt
            </Typography>
          }
          subheader={
            <Typography className="text-white" variant="overline" component={"div"}>
              Fast Food Co
            </Typography>
          } // date of receipt
          avatar={
            <Avatar sx={{ bgcolor: white }} aria-label="recipe">
              <HelpIcon />
            </Avatar>
          }
          onClick={handleOnClick}
        />
    )
  }

  return (
    
      <Card sx={{ width: 275 }}>
        { confirmClick ? <Confirmation /> : <DefaultHeader />}
        <Divider />
        <CardContent>
          
          <Typography sx={{marginBottom: 1, lineHeight: 1}} variant="h5" component={"div"}>
            <Typography variant="overline" component={"div"} className='ml-12'>
              <sup>
                ORDERED AT:
              </sup>
            </Typography>
            {'  '}
            { 
             <p className='ml-10'>{timeString}</p>
            }
            {'  '}

          </Typography>
          <Divider variant="middle" />
        </CardContent>

        <Grid container>
          <Grid item >
            <List sx={{ width: '100%' }} subheader={
              <ListSubheader component="div" id="nested-list-subheader" >
                ITEMS
              </ListSubheader>
              }>

              {list}

            </List>
          </Grid>
          {/* <Grid item xs={6}>
            <List subheader={
              <ListSubheader component="div" id="nested-list-subheader" >
                PRICE
              </ListSubheader>
              } >

              {priceList}
            </List>  
          </Grid> */}
        </Grid>
        <Typography variant="overline" className='ml-16 '>
          Subtotal: ${cartPrice.toFixed(2)}
          <p className='ml-16'>GST(17%): ${(cartPrice * 0.17).toFixed(2)}</p>
          <p className='font-bold text-lg ml-16'>Total: ${(cartPrice * 1.17).toFixed(2)}</p>
        </Typography>
      </Card>
  )
}

export default Receipt