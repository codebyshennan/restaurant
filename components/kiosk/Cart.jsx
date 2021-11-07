import React, {useState, useContext} from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion'
import {
  NavLink,
  useLocation
} from "react-router-dom";
import {CartContext, SubtotalContext} from '../../pages/kiosk/index.js'
import Image from 'next/image'

function Cart() {
  let location = useLocation()
  const {cartItems, setCartItems} = useContext(CartContext)
  const [newCart, setNewCart] = useState(location.cartProp)
  const {subtotal, setSubtotal} = useContext(SubtotalContext)
  
  const handleItemNumEdit = (didIncrease, index) => {
    const duplicatedItem = newCart[index]
    console.log(duplicatedItem)
    if(didIncrease) {
      console.log(subtotal)
      subtotal += Number(duplicatedItem.price)
      console.log(subtotal)
      setNewCart([...newCart, duplicatedItem])
      console.log(newCart)
    }
    else {
      subtotal -= Number(duplicatedItem.price)
      setNewCart(newCart.filter((item, idx) => {if (idx !== index) return item}))
    }
    setSubtotal(subtotal)
  }

  const handleCartEdit = () => {
    setCartItems(newCart)
  }

  const itemData = newCart.map((item, idx) => {
    return (
      <div className="mt-4 border-2 p-4 border-opacity-100 font-bold rounded-2xl" key={idx} >
        {item.beverage === undefined && (
           <Grid container spacing={2}>
            <Grid item xs={4}>
              <Image src={item.image_url} height='200' width='200' alt={item.name}/>
            </Grid>
            <Grid item xs={4}>
              {item.name} <br />
              <a onClick={() => {handleItemNumEdit(true,idx)}}>
                <ControlPointIcon color="success"/>
              </a>
            </Grid>
            <Grid item xs={4}>
            <a onClick={() => {handleItemNumEdit(false,idx)}}>
              <CloseIcon color="error"/>
            </a>
            <br />
            {/* allow them to update number of items */}
            {item.price}
            </Grid>
          </Grid>
        )}

        {item.beverage && (
          <Grid container spacing={2}>
          <Grid item xs={4}>
            <Image src={item.image_url} height='200' width='200' alt={item.name}/>
          </Grid>
          <Grid item xs={4}>
            {item.name} <br />
            {item.side[0].name} <br />
            {item.beverage[0].name} <br />
            <a onClick={() => {handleItemNumEdit(true,idx)}}>
              <ControlPointIcon color="success"/>
            </a>
          </Grid>
          <Grid item xs={4}>
          <a onClick={() => {handleItemNumEdit(false,idx)}}>
            <CloseIcon color="error"/>
          </a>
          <br />
          {/* allow them to update number of items */}
          {item.price}
          </Grid>
        </Grid>
        )}
      </div>
  )})
  
  return (
    <>
      <div className="pt-2">

        <Typography variant="h3" color="initial">Your cart</Typography>

        <div className="overflow-y-auto px-8 h-80 border-solid border-4">
          {itemData}
        </div>

        <div>
          <motion.div className="flex justify-between mx-64 my-16 font-semibold" 
          initial={{y: -50, opacity: 0}}
          animate={{y: 0, opacity: 1 }} 
          transition={{ duration: 0.5 }}>
          <p>Item Total:</p>
          <p>${subtotal.toFixed(2)}</p>
          </motion.div>

          <motion.div className="flex justify-between mx-64 my-16 font-semibold" 
          initial={{y: -50, opacity: 0}}
          animate={{y: 0, opacity: 1 }} 
          transition={{ duration: 1.0 }}>
            <p>Tax:</p>
            <p>${(subtotal * 0.17).toFixed(2)}</p>
          </motion.div>

          <motion.div className="flex justify-between mx-64 my-16 font-semibold" 
          initial={{y: -50, opacity: 0}}
          animate={{y: 0, opacity: 1 }} 
          transition={{ duration: 1.5 }}>
            <p>Total:</p>
            <p>${(subtotal * 1.17).toFixed(2)}</p>
          </motion.div>

          <motion.div className="mt-11" 
          initial={{y: -50, opacity: 0}}
          animate={{y: 0, opacity: 1 }} 
          transition={{ duration: 2 }}>

            <NavLink to={
              {pathname:"/paymentmode",
              cart:newCart,
              total:subtotal * 1.17
            }
            }>
              <Button variant="text" style={{backgroundColor: '#ffae42', color: '#000000'}} className="shadow-md" onClick={handleCartEdit}>
                <div className="p-6">
                    Proceed to Payment
                </div>
              </Button>
            </NavLink>
          </motion.div>
          <motion.div className="mt-11" 
          initial={{y: -50, opacity: 0}}
          animate={{y: 0, opacity: 1 }} 
          transition={{ duration: 2.5 }}>
            <NavLink to="/menu">
              <Button variant="error" style={{backgroundColor: '#ff0000', color: '#FFFFFF'}} className=" shadow-md" onClick={() => {handleCartEdit()}}>
                <div className="p-6">
                  Back to Menu
                </div>
              </Button>
            </NavLink>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Cart
