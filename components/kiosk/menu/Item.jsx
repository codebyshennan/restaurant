import React, {useContext, useState} from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, cardActionsClasses, CardActionArea } from '@mui/material'
import useStyles from './itemStyles.js'
import {
  NavLink,
  Link
} from "react-router-dom";
import {CartContext, SubtotalContext} from '../../../pages/kiosk/index.js'
import Image from 'next/image'
import {Modal, Box, Button} from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// on click, set elevation to lower (1 or 0) and set innerBG color to gray
function Item({item, isMain, id,}) {
   const [open, setOpen] = useState(false);

  console.log(item)
  const price =  item.price[0].price || item.price
  const classes = useStyles()
  const {cartItems, setCartItems} = useContext(CartContext)
  const {subtotal, setSubtotal} = useContext(SubtotalContext)
  const path = () => {
    if (!isMain) {
      console.log('returned menu')
      return '/menu'
    }
    else if (isMain || !item.ingredients) {
      return '/mealselect'
    }
    // return '/specialrequest'
  }
  
   const handleOpen = (item, index) => {
    setOpen(!open)
  };
  const addToCart = (indexOfPrice) => {
      const addedItem = JSON.parse(JSON.stringify(item))
      addedItem.price = addedItem.price[indexOfPrice].price
      setCartItems([...cartItems, addedItem])
      subtotal += addedItem.price
      setSubtotal(subtotal)
      setOpen(false)
  }
  return (
    <>
    {isMain && (<Card className={classes.root} elevation={5} variant="outlined" sx={{maxHeight: '40%'}}>
      <CardActionArea>
        <NavLink to={{
          pathname: path(),
          itemProp: {item: [item]}
      }}>
          <CardMedia component='img' image={item.image_url} height='140' alt={item.name} title={item.name} />
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
    </Card>
    )}
    {!isMain && (
      <>
      <Card className={classes.root} elevation={5} variant="outlined" sx={{maxHeight: '40%'}}>
      <a onClick={() => {handleOpen()}}>
      <CardActionArea>
          <CardMedia component='img' image={item.image_url} height='140' alt={item.name} title={item.name} />
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
      </CardActionArea>
      </a>
    </Card>
    <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                  <Box sx={style}>
                    <div>
                    <Typography variant="h6" component="h2">
                      Pick your size
                    </Typography>
                    {item.price.map((size, i) => (
                      <Button variant="outlined" key={i} onClick={() => { addToCart(i)}} className="my-8 p-8">
                        {item.name}, {size.size}, ${size.price}
                      </Button>
                      ))}
                  </div>
                </Box>
              </Modal>
              </>
              )}
         </>
  )
}

export default Item
