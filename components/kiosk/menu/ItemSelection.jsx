import React, {useContext, useState, useEffect} from 'react'
import Grid from '@mui/material/Grid'
import Item from './Item.jsx'
import { motion } from 'framer-motion'
import useStyles from './itemStyles.js'
import { MenuContext, MealContext, CompatibleMealContext} from '../../../pages/kiosk/index.js'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, cardActionsClasses, CardActionArea, Button } from '@mui/material'

function ItemSelection({category, currentItems, setCurrentItems, mainItem, currentPrice, setCurrentPrice, setGoToReview, setCategory}) {
  const classes = useStyles()
  const menuItems = useContext(MenuContext)
  const mealItems = useContext(MealContext)
  const compatibleMeal = useContext(CompatibleMealContext)
  console.log(mainItem)
  console.log(menuItems)
  const addMeal = (size) => {
    if (size === 'regular') {
          setCurrentItems([mainItem.main[0], [mainItem.side[0], 'M'], [mainItem.beverage[0], 'M']])
      setCurrentPrice(mainItem.total_cost.regular)
    }
    else{
      setCurrentItems([mainItem.main[0], [mainItem.side[0], 'L'], [mainItem.beverage[0], 'L']])
      setCurrentPrice(mainItem.total_cost.upsized)
    }
    changeCategory()
  }
  const editMeal = (item) => {
        console.log(item)
        const priceIncrease = item.price[0].price - currentItems[1][0].price[1].price
        currentItems[1][0] = item
        setCurrentItems([currentItems])
        currentPrice += priceIncrease
        setCurrentPrice(currentPrice)
        changeCategory()
  }
  const changeCategory = () => {
    if (category === 'meal') {
      setCategory('sides')
    }
    if (category === 'sides') {
      setCategory('beverage')
    }
    else if (category === 'beverage') {
      setGoToReview(true)
    }
  }
  console.log(currentItems)
  const searchTable = menuItems
  const items = searchTable.filter((item) => {
    if (item.type === category) {
      return item
    }
  })
  console.log(items)
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
        {category !== 'meal' && items.map((item, category) => (
          <motion.div 
            className="my-4 px-4 w-1/2 h-1/6" 
            initial={{x: 300, opacity: 0}}
            animate={{x: 0, opacity: 1 }} 
            transition={{ duration: 1 }} 
            key={item._id}
          >
          <Grid item>
            <Card className={classes.root} elevation={5} variant="outlined" sx={{maxHeight: '16%'}}>
              <a onClick={() => {editMeal(item)}}>
              <CardActionArea>
                <CardMedia className={classes.media} image='' title={item.name} />
                <CardContent>
                  <div className={classes.cardContent}>
                    <Typography variant="h6">
                      {item.name}
                    </Typography>
                    <Typography variant="h6" >
                      {(item.price[0].price - currentItems[1][0].price[1].price).toFixed(2) }
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
      </Grid>
      {category !== 'meal' && (
        <Button variant="outlined" color="default" onClick={changeCategory()}>
          Skip / Stay with default
        </Button>
      )}
    </div>
  )
}

export default ItemSelection
