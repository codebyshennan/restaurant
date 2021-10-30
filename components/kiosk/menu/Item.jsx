import React, {useContext, useState} from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, cardActionsClasses, CardActionArea } from '@mui/material'
import useStyles from './itemStyles.js'
import {
  NavLink,
  Link
} from "react-router-dom";
import {CartContext} from '../../../pages/kiosk/index.js'

// on click, set elevation to lower (1 or 0) and set innerBG color to gray
function Item({item, isMain, id }) {
  const classes = useStyles()
  const {cartItems, setCartItems} = useContext(CartContext)
  const path = () => {
    if (item.type === 'beverage') {
      return '/menu'
    }
    else if (isMain) {
      return '/mealselect'
    }
    return '/specialrequest'
  }

  const addToCart = (itemAdded) => {
    if (itemAdded.type === 'beverage') {
      setCartItems([...cartItems, itemAdded])
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
          <CardMedia className={classes.media} image='' title={item.name} />
          <CardContent>
            <div className={classes.cardContent}>
              <Typography variant="h6">
                {item.name}
              </Typography>
              <Typography variant="h6" >
                {item.price[0].price}
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
