import React, {useContext, useState} from 'react'
import Grid from '@mui/material/Grid'
import Item from './Item.jsx'
import { motion } from 'framer-motion'
import useStyles from './itemStyles.js'
import {Modal, Box} from '@mui/material'
import { MenuContext, MealContext, CompatibleMealContext} from '../../../pages/kiosk/index.js'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, cardActionsClasses, CardActionArea, Button } from '@mui/material'

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

function ItemSelection({category, currentItems, setCurrentItems, mainItem, currentPrice, setCurrentPrice, setGoToReview, setCategory, setSidePrice, setDrinkPrice, sidePrice, drinkPrice, mealSize, setMealSize}) {
  const [open, setOpen] = useState(false);
  // const handleClose = () => setOpen(false);
  const classes = useStyles()
  const menuItems = useContext(MenuContext)
  const mealItems = useContext(MealContext)
  const compatibleMeal = useContext(CompatibleMealContext)
  const addMeal = (size) => {
    if (size === 'regular') {
      mainItem.side[0].size = 'M'
      mainItem.beverage[0].size = 'M'
      setSidePrice(mainItem.side[0].price[1].price)
      setDrinkPrice(mainItem.beverage[0].price[1].price)
      setCurrentPrice(mainItem.total_cost.regular)
      setMealSize('regular')
    }
    else{
      mainItem.side[0].size = 'L'
      mainItem.beverage[0].size = 'L'
      setSidePrice(mainItem.side[0].price[2].price)
      setDrinkPrice(mainItem.beverage[0].price[2].price)
      setCurrentPrice(mainItem.total_cost.upsized)
      setMealSize('upsized')
    }
    setCurrentItems([mainItem.main[0], mainItem.side[0],mainItem.beverage[0]])
    setCategory('sides')
  }
  const editMeal = (item, size, itemPrice) => {
        // find what price needed based on size key
        // const priceIncrease = item.price[0].price - currentItems[1][0].price[1].price
        let priceIncrease = 0
        if (category === 'sides') {
          currentItems[1] = item
          priceIncrease = itemPrice - sidePrice
          console.log(priceIncrease)
          setSidePrice(itemPrice)
        }
        else {
          currentItems[2] = item
          priceIncrease = itemPrice - drinkPrice
          console.log(priceIncrease)
          setDrinkPrice(itemPrice)
        }
        setCurrentItems([...currentItems])
        currentPrice += priceIncrease
        console.log(currentPrice)
        setCurrentPrice(currentPrice)
        console.log(currentPrice)
        changeCategory()
  }
  const changeCategory = () => {
    if (category === 'sides') {
      setCategory('beverage')
    }
    else if (category === 'beverage') {
      setGoToReview(true)
    }
  }
  const searchTable = menuItems
  const items = searchTable.filter((item) => {
    if (item.type === category) {
      return item
    }
  })
    const [sideItem, setSideItem] = useState(items[0])
    const handleOpen = (item) => {
    if (!open) {
      setSideItem(item)
    }
    setOpen(!open)
  };
      console.log(mainItem)
  return (
    <div className='mt-8'>
            {category !== 'meal' && (
        <Button variant="outlined" onClick={() => {changeCategory()}} className='p-12 '>
          Skip / Stay with default
        </Button>
      )}
      <Grid container justifyContent="center" spacing={4}>
        <Grid item xs={12} className="justify-items-center">
          <motion.div 
          className="my-4 h-1/6" 
          initial={{x: 300, opacity: 0}}
          animate={{x: 0, opacity: 1 }} 
          transition={{ duration: 1 }}
          >
            <Typography variant='h2'>
              Choose your {category}
            </Typography>
          </motion.div>
        </Grid>
        {category === 'meal' && (
        <Grid container justifyContent="center" spacing={4}>
          <motion.div 
            className="my-4 px-4 w-1/3 h-1/6" 
            initial={{x: 300, opacity: 0}}
            animate={{x: 0, opacity: 1 }} 
            transition={{ duration: 1 }}
          >
          <Grid item>
            <Card className={classes.root} elevation={5} variant="outlined" sx={{maxHeight: '16%'}}>
              <a onClick={() => {addMeal('regular')}}>
              <CardActionArea>
                <CardMedia component='img' image={mainItem.image_url} height='140' alt={mainItem.name} title='regular meal' />
                <CardContent>
                  <div className={classes.cardContent}>
                    <Typography variant="h6">
                      Regular Meal
                    </Typography>
                    <Typography variant="h6" >
                      {mainItem.total_cost.regular}
                    </Typography>
                  </div>
                </CardContent>
                </CardActionArea>
              </a>
            </Card>
          </Grid>
          </motion.div>
          <motion.div 
            className="my-4 px-4 w-1/3 h-1/6" 
            initial={{x: 300, opacity: 0}}
            animate={{x: 0, opacity: 1 }} 
            transition={{ duration: 1 }}
          >
          <Grid item>
            <Card className={classes.root} elevation={5} variant="outlined" sx={{maxHeight: '16%'}}>
              <a onClick={() => {addMeal('upsized')}}>
              <CardActionArea>
                <CardMedia component='img' image={mainItem.image_url} height='140' alt={mainItem.name} title="upsized meal" />
                <CardContent>
                  <div className={classes.cardContent}>
                    <Typography variant="h6">
                      Upsized Meal
                    </Typography>
                    <Typography variant="h6" >
                      {mainItem.total_cost.upsized}
                    </Typography>
                  </div>
                </CardContent>
                </CardActionArea>
              </a>
            </Card>
          </Grid>
          </motion.div>
        </Grid>
        )}
        {category !== 'meal' && items.map((item, index) => (
          <Grid item xs={4} key={index}>
            <motion.div 
            initial={{x: 300, opacity: 0}}
            animate={{x: 0, opacity: 1 }} 
            transition={{ duration: 1 }} 
            key={index}
          >
            <Card className={classes.root} elevation={5} variant="outlined">
              <a onClick={()=> {handleOpen(item)}}>
              <CardActionArea>
                <CardMedia component='img' image={item.image_url} height='140' alt={item.name} title={item.name} />
                <CardContent>
                  <div className={classes.cardContent}>
                    <Typography variant="h6">
                      {item.name}
                    </Typography>
                    <Typography variant="h6" >
                      {/* {item.price[0].price - sidePrice} */}
                      {category === 'sides' && (item.price[0].price - sidePrice).toFixed(2)}
                      {category === 'beverage' && (item.price[0].price - drinkPrice).toFixed(2)}
                    </Typography>
                  </div>
                </CardContent>
                
                </CardActionArea>
              </a>
            </Card>
            </motion.div>
          </Grid>
        ))
        }
         {category !== 'meal' && (<Modal
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
                    {sideItem.price.map((size, i) => (
                      <Button variant="outlined" key={i} onClick={() => { editMeal(sideItem, size.size, size.price)}} className="my-8 p-8">
                        {sideItem.name}, {size.size}, ${category === 'sides' ? (size.price - sidePrice).toFixed(2) : (size.price - drinkPrice).toFixed(2)}
                      </Button>
                      ))}
                  </div>
                </Box>
              </Modal>
         )}
      </Grid>
    </div>
  )
}

export default ItemSelection
