import React, {useContext, useState} from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, cardActionsClasses, CardActionArea } from '@mui/material'
import useStyles from './itemStyles.js'
import {
  NavLink,
  Link
} from "react-router-dom";
import {CartContext} from '../index.js';

// on click, set elevation to lower (1 or 0) and set innerBG color to gray
function Item({item, isMain, id }) {
  const classes = useStyles()
  const {cartItems, setCartItems} = useContext(CartContext)
  // const handleAddCartItem = (itemAdded) => {
    
  // }
  return (
    <Card className={classes.root} elevation={5} variant="outlined">
      <CardActionArea to={isMain ? "/mealselect" : "/specialrequest"}>
        <NavLink to={{
          pathname:isMain ? "/mealselect" : "/specialrequest",
          itemProp: {item: item}
      }}>
          <CardMedia className={classes.media} image='' title={item.item_name} />
          <CardContent>
            <div className={classes.cardContent}>
              <Typography variant="h5">
                {item.item_name}
              </Typography>
              <Typography variant="h5" >
                {item.price}
              </Typography>
            </div>
          </CardContent>
        </NavLink>
      </CardActionArea>
    </Card>
  )
}

export default Item
