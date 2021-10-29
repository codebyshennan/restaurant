import React, {useContext, useState, Fragment, useEffect} from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveIcon from '@mui/icons-material/Remove';
import { motion } from 'framer-motion'
import {
  NavLink,
  useLocation
} from "react-router-dom";
import {CartContext} from './index.js'
import { ListItemSecondaryAction } from '@mui/material';
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';

export const SpecialRequest = (props) => {
  let location = useLocation()
  // change to allow sets
  const itemAddOns = location.itemProp.item[0].add_ons
  const itemAddOnsArray = Object.entries(itemAddOns)

  const [addOns, setAddOns] = useState(itemAddOnsArray)
  const {cartItems, setCartItems} = useContext(CartContext)
  const changeAddons = (itemIndex, didAdd) => {
    const currentAddOns = addOns
    if (didAdd) {
      currentAddOns[itemIndex][1] += 1
    }
    else {
      currentAddOns[itemIndex][1] -= 1
    }
    setAddOns([...currentAddOns])
  }

  const handleAddToCart = () => {
    // need to change to allow sets
    const newAddons = Object.fromEntries(addOns)
    location.itemProp.item[0].add_ons = newAddons
    setCartItems([...cartItems, location.itemProp.item[0]])
    console.log(cartItems)
  }

  useEffect(() => {
    console.log(cartItems)
    // eslint-disable-next-line
  }, [cartItems])

  const data = addOns
                .map(([key,value], idx)=>{
                  return ( 
                      <Grid container key={idx} >
                        <Grid item xs={8}>
                          <div className="pr-5 py-5">
                           {key}
                          </div>
                        </Grid>

                        <Grid item xs={4}>
                          <div className="pt-5">
                            <p id={key}>
                              {value}
                            </p>
                            <p>
                              <a onClick={() => {changeAddons(idx, false)}}><RemoveIcon color="error"/></a>
                              <a onClick={() => {changeAddons(idx, true)}}><ControlPointIcon color="success"/></a>
                            </p>

                          </div>
                        </Grid>
                      </Grid>
                  )
                })

  return (

      <>

        <div className="pt-8 mt-11">

          <Typography variant="h3" color="initial">Any Special Requests?</Typography>

          <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
            <Grid item xs>
              <div className="mt-8 shadow-lg h-96 rounded-3xl">
                { data }
              </div>
            </Grid>
          </Grid>


          <motion.div className="mt-11" initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1 }} 
            transition={{ duration: 1.5 }}>


          <NavLink to="/menu">
            <Button variant="success" style={{backgroundColor: '#009900', color: '#FFFFFF'}} className="pt-8 shadow-md" onClick={() => { handleAddToCart()}}>
            <div className="p-11">
                  Add to Cart
            </div>
            </Button>
         </NavLink>

          </motion.div>

          <motion.div className="mt-11" initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1 }} 
            transition={{ duration: 1.5 }}>
            
            <NavLink to="/menu">
              <Button variant="error" style={{backgroundColor: '#ff0000', color: '#FFFFFF'}} className="pt-8 shadow-md">
                <div className="p-11">
                    Cancel Item
                </div>
              </Button>
            </NavLink>

          </motion.div>
        </div>
      </>
  )
}

export default SpecialRequest
