import React, {useContext, useState, useEffect} from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import {
  NavLink,
  useLocation
} from "react-router-dom";
import {CartContext, SubtotalContext} from '../../../pages/kiosk/index.js'
import {CartPopUp} from './CartPopUp.jsx'
import MenuCartFooter from './MenuCartFooter.jsx'
import SpecialRequest from '../SpecialRequest.jsx'
import {Modal, Box} from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveIcon from '@mui/icons-material/Remove';
import { motion } from 'framer-motion'
import Image from 'next/image'


function ReviewScreen({currentPrice, currentItems, setCurrentItems, setGoToReview, setCategory, setCurrentPrice, mealSize, meal}) {
  // const {cartItems, setCartItems} = useContext(CartContext)
  // const {subtotal, setSubtotal} = useContext(SubtotalContext)
  //   const addToCart = () => {
  //   setSubtotal(subtotal += currentPrice)
  //   setCartItems(...cartItems, currentItems)
  // }
  const [open, setOpen] = useState(false)
   const [index, setIndex] = useState(0)
  const [initialRender, setInitialRender] = useState(true)
   const initialState = JSON.parse(JSON.stringify(currentItems[index]))
  const [currentItem, setCurrentItem] = useState(currentItems[0])
  const [prevItem, setPrevItem] = useState({})
      console.log(prevItem)
    console.log(currentItem)
  useEffect(() => {
    if (prevItem === currentItem && open || prevItem === {}){
    setOpen(false)
    }
    else {
      if (!initialRender) {
      setOpen(true)
      }
      else{
        setInitialRender(false  )
      }
      setPrevItem(currentItem)
    }
  },[currentItem])
  // change to allow sets
  //change to index for diff prices
  const {cartItems, setCartItems} = useContext(CartContext)
  const changeAddons = (itemIndex, didAdd) => {
    if (didAdd && currentItem.ingredients[itemIndex].quantity < currentItem.ingredients[itemIndex].limit) {
      currentItem.ingredients[itemIndex].quantity += 1
      currentItem.price[0].price += currentItem.ingredients[itemIndex].price_per_unit
    }
    else if (!didAdd && currentItem.ingredients[itemIndex].quantity > 0) {
      currentItem.ingredients[itemIndex].quantity -= 1
      currentItem.price[0].price -= currentItem.ingredients[itemIndex].price_per_unit
    }
    setCurrentItem({...currentItem, price: currentItem.price, ingredients: currentItem.ingredients})
  }

  const handleFinishEdit = () => {
    setCurrentItems([...currentItems, currentItem])
    setOpen(false)
  }

  const handleResetEdit = () => {
    setCurrentItem(initialState)
    setOpen(false)
  }

  console.log(open)

  const data = currentItem.ingredients
                .map((ingredient, idx)=>{
                  return ( 
                      <Grid container key={idx} >
                        <Grid item xs={8}>
                          <div className="pr-5 py-5">
                           {ingredient.name}
                          </div>
                        </Grid>

                        <Grid item xs={4}>
                          <div className="pt-5">
                            <p>
                              {ingredient.quantity}
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
    <div className="mt-16 mx-8">
      <Typography variant="h5" color="initial">
        Review
      </Typography>
      <Grid container spacing = {3}>
        <Grid item xs={4}>
          <div>
            <Image src={currentItems[0].image_url} height='200' width='200' alt={currentItems[0].name}/>
          </div>
            <Button variant="outlined" onClick={()=> {setCurrentItem(currentItems[0])}}>
              Customize
            </Button>
        </Grid>
        <Grid item xs={4}>
          <div>
            <Image src={currentItems[1].image_url} height='200' width='200' alt={currentItems[1].name}/>
          </div>
          {currentItems[1].ingredients !== null && (
            <Button variant="outlined" onClick={()=> {setCurrentItem(currentItems[1])}}>
              Customize
            </Button>
             )} 
          <Button variant="outlined">
            Change Item
          </Button>
        </Grid>
        <Grid item xs={4}>
          <div>
            <Image src={currentItems[2].image_url} height='200' width='200' alt={currentItems[2].name}/>
          </div>
          {currentItems[2].ingredients !== null && (
            <Button variant="outlined" onClick={()=> {setCurrentItem(currentItems[2])}}>
              Customize
            </Button>
          )}   
          <Button variant="outlined">
            Change Item
          </Button>
        </Grid>
      </Grid>
      {open && (<div
                className="pt-8 mt-11"
              >
                  <Typography variant="h3" color="initial">Any Special Requests?</Typography>
        {/* {location.itemProp.item.map((item, i) =>)} */}
          <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
            <Grid item xs>
              <div className="mt-8 shadow-lg rounded-3xl">
                { data }
              </div>
              <Typography variant="h6" color="initial">
               
              </Typography>
            </Grid>
          </Grid>

           {/* <motion.div className="mt-11" initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1 }} 
            transition={{ duration: 1 }}>

           </motion.div> */}

          <motion.div className="mt-11" initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1 }} 
            transition={{ duration: 1.5 }}>


            <Button variant="success" style={{backgroundColor: '#009900', color: '#FFFFFF'}} className="pt-8 shadow-md" onClick={() => { handleFinishEdit(currentItem)}}>
            <div className="p-11">
                  I'm done customising
            </div>
            </Button>

          </motion.div>

          <motion.div className="mt-11" initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1 }} 
            transition={{ duration: 1.5 }}>
            
              <Button variant="error" style={{backgroundColor: '#ff0000', color: '#FFFFFF'}} className="pt-8 shadow-md" onClick={() => {handleResetEdit()}}>
                <div className="p-11">
                    Cancel Edit
                </div>
              </Button>

          </motion.div>
              </div>)}
      <div className="mt-11">
        <MenuCartFooter currentPrice={currentPrice} setCurrentItems={setCurrentItems} setGoToReview={setGoToReview} setCategory={setCategory} setCurrentPrice={setCurrentPrice} currentItems={currentItems} mealSize={mealSize} meal={meal} />
      </div>
    </div>
  )
}

export default ReviewScreen
