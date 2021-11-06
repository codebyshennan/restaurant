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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Typography from '@mui/material/Typography'

function SideRequest() {
  let location = useLocation()
  const orderedMeal = location.itemProp.itemMeal
  const [menuItems] = useContext(MenuContext)
  const [sidePrice, setSidePrice] = useState(0.00)
  const [drinkPrice, setDrinkPrice] = useState(0.00)
  const [category, setCategory] = useState('meal')
  const [currentItems, setCurrentItems] = useState([])
  const [goToReview, setGoToReview] = useState(false)
  const [currentPrice, setCurrentPrice] = useState(0.00)
  const [mealSize, setMealSize] = useState('')
  console.log(category)
  return (
    <div>
      {goToReview && <ReviewScreen currentPrice={currentPrice} currentItems={currentItems} setCurrentItems={setCurrentItems} setGoToReview={setGoToReview} setCategory={setCategory} setCurrentPrice={setCurrentPrice} mealSize={mealSize} meal={orderedMeal}/>}
      {!goToReview && (
      <>
      <Grid container className = "h-1/2 w-screen" spacing = {1} justifyContent ="center">
         <Grid item xs={3} sx={{height: '80vh'}} className="overflow-y-scroll" justifyContent="center">
          <motion.div 
          className="px-4 overflow-hidden" 
          initial={{x: 300, opacity: 0}}
          animate={{x: 0, opacity: 1 }} 
          transition={{ duration: 1 }}>
            {category === 'meal' && (
            <div className='p-2 font-mono text-black border-4 border-solid border-gray-50 bg-white'>
              <Typography variant="h6" color="initial">
                Meal 
              </Typography> 
            </div>
            )}
            {category !== 'meal' && (
            <div className=' p-2 font-mono border-4 border-solid  bg-green-500 border-gray-50 text-white'>
            <CheckCircleIcon /> 
            <Typography variant="h6" color="initial">
            Meal  
            </Typography> 
            </div>
            )}
          </motion.div>
          <motion.div className="px-4 overflow-hidden" 
          initial={{x: 300, opacity: 0}}
          animate={{x: 0, opacity: 1 }} 
          transition={{ duration: 1 }}>
            {category !== 'beverage' && !goToReview && (
            <div className='p-2 font-mono text-black border-4 border-solid border-gray-50 bg-white'>
            <Typography variant="h6" color="initial">
            Side  
            </Typography>
            </div>
            )}
            {category === 'beverage' && (
             <div className='p-2 font-mono border-4 border-solid bg-green-500 border-gray-50 text-white'>
               <CheckCircleIcon />
            <Typography variant="h6" color="initial">
            Side  
            </Typography>
              <div>
              {currentItems[1].name}
              <br />
              {currentItems[1].size}
              <br />
              {sidePrice}
              </div>
            </div>
            )}
          </motion.div> 
          <motion.div 
          className="px-4 overflow-hidden" 
          initial={{x: 300, opacity: 0}}
          animate={{x: 0, opacity: 1 }} 
          transition={{ duration: 1 }}>
            {!goToReview && (
            <div className='p-2 font-mono text-black border-4 border-solid border-gray-50 bg-white'>
            <Typography variant="h6" color="initial">
            Drink  
            </Typography>
            </div>
            )}
            {goToReview && (
             <div className='p-2 font-mono border-4 border-solid bg-green-500 border-gray-50 text-white'>
               <CheckCircleIcon />
            <Typography variant="h6" color="initial">
            Drink  
            </Typography>
              <div>
              {currentItems[2].name}
              <br />
              {currentItems[2].size}
              <br />
              {drinkPrice}
              </div>
            </div>
            )}
          </motion.div>
          <motion.div 
          className="px-4 overflow-hidden" 
          initial={{x: 300, opacity: 0}}
          animate={{x: 0, opacity: 1 }} 
          transition={{ duration: 1 }}>
             {goToReview && (
            <div className='p-2 font-mono text-black border-4 border-solid border-gray-50'>
            <Typography variant="h6" color="initial">
            Review  
            </Typography>
            </div>
            )}
            {!goToReview && (
             <div className='p-2 font-mono border-4 border-solid border-gray-50 text-black'>
              <Typography variant="h6" color="initial">
            Review  
            </Typography>
            </div>
            )}
          </motion.div>
         </Grid>
         <Grid item xs={9} className="overflow-y-scroll" sx={{maxHeight: '80vh'}}>
           {category === 'meal' && <ItemSelection category={'meal'}  currentItems={currentItems} setCurrentItems={setCurrentItems} mainItem={orderedMeal} currentPrice={currentPrice} setCurrentPrice={setCurrentPrice} setCategory={setCategory} setSidePrice={setSidePrice} setDrinkPrice={setDrinkPrice} mealSize={mealSize} setMealSize={setMealSize}/>}

           {category === 'sides' && <ItemSelection category={'sides'} currentItems={currentItems} setCurrentItems={setCurrentItems} mainItem={orderedMeal.side[0]} currentPrice={currentPrice} setCurrentPrice={setCurrentPrice} setCategory={setCategory} sidePrice={sidePrice} setSidePrice={setSidePrice}/>}

           {category === 'beverage' && <ItemSelection category={'beverage'} currentItems={currentItems} setCurrentItems={setCurrentItems} mainItem={orderedMeal.beverage[0]} currentPrice={currentPrice} setCurrentPrice={setCurrentPrice} setGoToReview={setGoToReview} setCategory={setCategory} drinkPrice={drinkPrice} setDrinkPrice={setDrinkPrice} />}
        </Grid>
      </Grid>
      <MenuCartFooter currentItems={currentItems} currentPrice={currentPrice} setGoToReview={setGoToReview} setCurrentItems={setCurrentItems} setCategory={setCategory} setCurrentPrice={setCurrentPrice} mealSize={mealSize} meal={orderedMeal}/>
      </>
      )}
    </div>
  )
}

export default SideRequest
