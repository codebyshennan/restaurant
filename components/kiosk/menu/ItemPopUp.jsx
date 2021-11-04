import React from 'react'
import Button from '@mui/material/Button'
import { motion } from 'framer-motion'
import {Modal, Box, Typography} from '@mui/material'

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

function ItemPopUp(item, currentCost, handleOpen) {
  console.log(item.item)
  console.log(item.currentCost)
  const sideItem = item.item
  return (
                   <Modal
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
                    {sideItem.name}
                    {sideItem.price.map((size, i) => {
                          <a>
                            {sideItem.name}, {size.size}, ${size.price - item.currentCost}
                          </a>
                    })}
                  </div>
                </Box>
              </Modal>
  )
}

export default ItemPopUp
