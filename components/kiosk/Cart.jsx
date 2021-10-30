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
import {CartContext} from '../../pages/kiosk/index.js'

function Cart() {
  let location = useLocation()
  const {cartItems, setCartItems} = useContext(CartContext)
  const [newCart, setNewCart] = useState(location.cartProp)
  const [newSubtotal, setNewSubtotal] = useState(Number(location.subtotal))
  console.log(typeof location.subtotal)
  const handleItemNumEdit = (didIncrease, index) => {
    const duplicatedItem = newCart[index]
    console.log(duplicatedItem)
    if(didIncrease) {
      newSubtotal += duplicatedItem.price[0].price
      setNewCart([...newCart, duplicatedItem])
    }
    else {
      newSubtotal -= duplicatedItem.price[0].price
      setNewCart(newCart.filter((item, idx) => {if (idx !== index) return item}))
    }
    console.log(newSubtotal)
  setNewSubtotal(newSubtotal)
  }
  const handleCartEdit = () => {
    setCartItems(newCart)
  }
  const itemData = newCart.map((item, idx) => {return (
      <div className="m-12 border-2 p-8 border-opacity-100 font-bold rounded-2xl" key={idx} >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            IMAGE
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
          {item.price[0].price}
          </Grid>
        </Grid>
      </div>
  )})
  return (
    <>
    <div className="pt-8 mt-11">
      <Typography variant="h3" color="initial">Please select your mode of payment</Typography>
      {itemData}
      <div>
        <motion.div className="flex justify-between mx-64 my-16 font-semibold" initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 0.5 }}>
        <p>Item Total:</p>
        <p>{newSubtotal}</p>
        </motion.div>
        <motion.div className="flex justify-between mx-64 my-16 font-semibold" initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 1.0 }}>
        <p>Tax:</p>
        <p>{parseFloat(newSubtotal * 0.17).toFixed(2)}</p>
        </motion.div>
        <motion.div className="flex justify-between mx-64 my-16 font-semibold" initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 1.5 }}>
        <p>Total:</p>
        <p>{parseFloat(newSubtotal * 1.17).toFixed(2)}</p>
        </motion.div>
        <motion.div className="mt-11" initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 2 }}>
      <NavLink to={
        {pathname:"/paymentmode",
        cart:newCart,
        total:newSubtotal * 1.17
      }
      }>
        <Button variant="text" style={{backgroundColor: '#ffae42', color: '#000000'}} className="pt-8 shadow-md" onClick={() => {handleCartEdit()}}>
        <div className="p-11">
            Proceed to Payment
        </div>
        </Button>
      </NavLink>
      </motion.div>
      <motion.div className="mt-11" initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1 }} 
            transition={{ duration: 2.5 }}>
            
            <NavLink to="/menu">
              <Button variant="error" style={{backgroundColor: '#ff0000', color: '#FFFFFF'}} className="pt-8 shadow-md" onClick={() => {handleCartEdit()}}>
                <div className="p-11">
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
