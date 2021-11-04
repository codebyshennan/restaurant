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

function ItemSelection({category, currentItems, setCurrentItems, mainItem, currentPrice, setCurrentPrice, setGoToReview, setCategory, setSidePrice, setDrinkPrice, sidePrice, drinkPrice}) {
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
    }
    else{
      mainItem.side[0].size = 'L'
      mainItem.beverage[0].size = 'L'
      setSidePrice(mainItem.side[0].price[2].price)
      setDrinkPrice(mainItem.beverage[0].price[2].price)
      setCurrentPrice(mainItem.total_cost.upsized)
    }
    setCurrentItems([mainItem.main[0], mainItem.side[0],mainItem.beverage[0]])
    setCategory('sides')
  }
  const editMeal = (item, size, itemPrice) => {
        // find what price needed based on size key
        // const priceIncrease = item.price[0].price - currentItems[1][0].price[1].price
        if (category === 'sides') {
          currentItems[1] = item
          const priceIncrease = itemPrice - sidePrice
          setSidePrice(itemPrice)
        }
        else {
          currentItems[2] = item
          const priceIncrease = itemPrice - drinkPrice
          setDrinkPrice(itemPrice)
        }
        console.log(item)
        console.log(size)
        console.log(itemPrice)
        console.log(currentItems)
        setCurrentItems([...currentItems])
        currentPrice += priceIncrease
        setCurrentPrice(currentPrice)
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
    const handleOpen = (item, index) => {
    if (!open) {
      setSideItem(item)
    }
    setOpen(!open)
  };
      console.log(sidePrice)
  return (
    <div>
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
                <CardMedia className={classes.media} image='' title="regular meal" />
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
                <CardMedia className={classes.media} image='' title="upsized meal" />
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
          <motion.div 
            className="my-4 px-4 w-1/2 h-1/6" 
            initial={{x: 300, opacity: 0}}
            animate={{x: 0, opacity: 1 }} 
            transition={{ duration: 1 }} 
            key={index}
          >
          <Grid item>
            <Card className={classes.root} elevation={5} variant="outlined" sx={{maxHeight: '16%'}}>
              <a onClick={()=> {handleOpen(item, index)}}>
              <CardActionArea>
                <CardMedia className={classes.media} image='' title={item.name} />
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
          </Grid>
          </motion.div>
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
                      <Button variant="outlined" key={i} onClick={() => { editMeal(sideItem, size.size, size.price)}}>
                        {sideItem.name}, {size.size}, ${category === 'sides' ? (size.price - sidePrice).toFixed(2) : (size.price - drinkPrice).toFixed(2)}
                      </Button>
                      ))}
                  </div>
                </Box>
              </Modal>
         )}
      </Grid>
      {category !== 'meal' && (
        <Button variant="outlined" onClick={() => {changeCategory()}}>
          Skip / Stay with default
        </Button>
      )}
    </div>
  )
}

export default ItemSelection
