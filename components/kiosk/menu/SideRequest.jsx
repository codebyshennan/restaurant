import React, {useState, useContext} from 'react'
import Grid from '@mui/material/Grid'
import Item from './Item.jsx'
import { motion } from 'framer-motion'
import Button from '@mui/material/Button'
import {
  NavLink,
  useLocation
} from "react-router-dom";
import { MenuContext } from '../../../pages/kiosk/index.js';
import SpecialRequest from '../SpecialRequest.jsx';
import ItemSelection from './ItemSelection.jsx';
import MenuCartFooter from './MenuCartFooter.jsx';
import MealSelect from '../MealSelect.jsx'
import ReviewScreen from './ReviewScreen.jsx'

function SideRequest() {
  let location = useLocation()
  const orderedItem = location.itemProp.itemMeal
  const [menuItems] = useContext(MenuContext)
  const [category, setCategory] = useState('meal')
  const [currentItems, setCurrentItems] = useState([])
  const [goToReview, setGoToReview] = useState(false)
  console.log(currentItems)
  const [currentPrice, setCurrentPrice] = useState(0.00)
  console.log(goToReview)
  console.log(category)
  return (
    <div>
      {goToReview && <ReviewScreen />}
      {!goToReview && <Grid container className = "h-screen w-screen" spacing = {5} justifyContent ="center">
         <Grid item xs={3} sx={{maxHeight: '80vh'}} className="overflow-y-scroll" justifyContent="center">
          <motion.div 
          className="my-4 px-4 w-1/2 overflow-hidden h-1/6" 
          initial={{x: 300, opacity: 0}}
          animate={{x: 0, opacity: 1 }} 
          transition={{ duration: 1 }}>
            Meal
          </motion.div>
          <motion.div className="my-4 px-4 w-1/2 overflow-hidden h-1/3" 
          initial={{x: 300, opacity: 0}}
          animate={{x: 0, opacity: 1 }} 
          transition={{ duration: 1 }}>
            Side
            {currentItems[1] && (
              <div>
              {currentItems[1][0].name}
              <br />
              {currentItems[1][1]}
              <br />
              {currentItems[1][1] === 'M' && currentItems[1][0].price[1].price}
              {currentItems[1][1] === 'L' && currentItems[1][0].price[2].price}
              </div>
            )}
          </motion.div> 
          <motion.div 
          className="my-4 px-4 w-1/2 overflow-hidden h-1/3" 
          initial={{x: 300, opacity: 0}}
          animate={{x: 0, opacity: 1 }} 
          transition={{ duration: 1 }}>
            Drink
            {currentItems[2] && (
              <div>
              {currentItems[2][0].name}
              <br />
              {currentItems[2][1]}
                            <br />
              {currentItems[2][1] === 'M' && currentItems[2][0].price[1].price}
              {currentItems[2][1] === 'L' && currentItems[2][0].price[2].price}
              </div>
            )}
          </motion.div>
          <motion.div 
          className="my-4 px-4 w-1/2 overflow-hidden h-1/6" 
          initial={{x: 300, opacity: 0}}
          animate={{x: 0, opacity: 1 }} 
          transition={{ duration: 1 }}>
            Review
          </motion.div>
         </Grid>
         <Grid item xs={9}>
           {category === 'meal' && <ItemSelection category={'meal'}  currentItems={currentItems} setCurrentItems={setCurrentItems} mainItem={orderedItem} currentPrice={currentPrice} setCurrentPrice={setCurrentPrice} setCategory={setCategory}/>}

           {category === 'sides' && <ItemSelection category={'sides'} currentItems={currentItems} setCurrentItems={setCurrentItems} mainItem={orderedItem.side[0]} currentPrice={currentPrice} setCurrentPrice={setCurrentPrice} setCategory={setCategory}/>}

           {category === 'beverage' && <ItemSelection category={'beverage'} currentItems={currentItems} setCurrentItems={setCurrentItems} mainItem={orderedItem.beverage[0]} currentPrice={currentPrice} setCurrentPrice={setCurrentPrice} setGoToReview={setGoToReview} setCategory={setCategory}/>}

           <MenuCartFooter currentItems={currentItems} currentPrice={currentPrice} />
        </Grid>
      </Grid>
      }
    </div>
  )
}

export default SideRequest
