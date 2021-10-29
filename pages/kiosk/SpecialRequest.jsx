import React, {useContext, useState, Fragment} from 'react'
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
  const {cartItems, setCartItems} = useContext(CartContext)
  // const handleAddCartItem = (itemAdded) => {
    
  // }

  let location = useLocation()
  console.log(location)
  const itemAddOns = location.itemProp.item[0].add_ons
  console.log(itemAddOns)

  const data = Object
                .entries(itemAddOns)
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
                              {value}
                            <p>
                              <RemoveIcon color="error"/>
                              <ControlPointIcon color="success"/>
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

            <Button variant="success" style={{backgroundColor: '#009900', color: '#FFFFFF'}} className="pt-8 shadow-md">
            <div className="p-11">

                <NavLink to="/menu">
                  Add to Cart
                </NavLink>

            </div>
            </Button>

          </motion.div>

          <motion.div className="mt-11" initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1 }} 
            transition={{ duration: 1.5 }}>
            
            <Button variant="error" style={{backgroundColor: '#ff0000', color: '#FFFFFF'}} className="pt-8 shadow-md">
            
              <div className="p-11">

                <NavLink to="/menu">
                  Cancel Item
                </NavLink>
              </div>
            </Button>

          </motion.div>
        </div>
      </>
  )
}

export default SpecialRequest
