import React, {useContext, useState} from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, cardActionsClasses, CardActionArea } from '@mui/material'
import useStyles from './itemStyles.js'
import {
  NavLink,
  Link
} from "react-router-dom";
import {CartContext, SubtotalContext} from '../../../pages/kiosk/index.js'
import Image from 'next/image'


// on click, set elevation to lower (1 or 0) and set innerBG color to gray
function Item({item, isMain, id,}) {

  console.log(item)
  const price = item.price[0].price || item.price
  const classes = useStyles()
  const {cartItems, setCartItems} = useContext(CartContext)
  const {subtotal, setSubtotal} = useContext(SubtotalContext)
  const path = () => {
    if (item.type === 'beverage') {
      console.log('returned menu')
      return '/menu'
    }
    else if (isMain || !item.ingredients) {
      return '/mealselect'
    }
    return '/specialrequest'
  }

  const addToCart = (itemAdded) => {
    if (itemAdded.type === 'beverage') {
      setCartItems([...cartItems, itemAdded])
      subtotal += itemAdded.price[1].price
      setSubtotal(subtotal)
    }
  }
  return (
    <Card className={classes.root} elevation={5} variant="outlined" sx={{maxHeight: '16%'}}>
      <a onClick={() => {addToCart(item)}}>
      <CardActionArea to={path()}>
        <NavLink to={{
          pathname: path(),
          itemProp: {item: [item]}
      }}>
          <CardMedia className={classes.media} image={<Image src="/img/beverages/milk.png" alt="milk" layout="fill" objectFit="cover"/>} title={item.name} />
          <CardContent>
            <div className={classes.cardContent}>
              <Typography variant="h6">
                {item.name}
              </Typography>
              <Typography variant="h6" >
                {price}
              </Typography>
            </div>
          </CardContent>
        </NavLink>
      </CardActionArea>
      </a>
    </Card>
  )
}

export default Item
