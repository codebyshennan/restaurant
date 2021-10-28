import React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'

export const SidebarMenu = (props) => {
  return (
    <motion.div className="pt-8 mt-11 w-1/3"  sx={{ gridArea: 'sidebar' }} initial={{x: -50, opacity: 0}}
    animate={{x: 0, opacity: 1 }} 
    transition={{ duration: 1 }}>
      <div className="mt-2 w-28">
      <Button variant="success" style={{backgroundColor: '#FFFFFF', color: '#000000'}} className="pt-8 shadow-md" >
        <div className="p-3 w-28">
          What's New
        </div>
      </Button>
      </div>
      <div className="mt-2 w-28">
      <Button variant="error" style={{backgroundColor: '#FFFFFF', color: '#000000'}}className="pt-8 shadow-md">
        <div className="p-3 w-28">
          <p>Popular
          </p>
        </div>
      </Button>
      </div>
      <div className="mt-2 w-28">
        <Button variant="error" style={{backgroundColor: '#FFFFFF', color: '#000000'}} className="pt-8 shadow-md">
        <div className="p-3 w-28">
          <p>Burgers <br />
          </p>
        </div>
      </Button>
      </div>
      <div className="mt-2 w-28">
        <Button variant="error" style={{backgroundColor: '#FFFFFF', color: '#000000'}} className="pt-8 shadow-md">
        <div className="p-3 w-28">
          <p>Sides <br />
          </p>
        </div>
      </Button>
      </div>
      <div className="mt-2 w-28">
        <Button variant="error" style={{backgroundColor: '#FFFFFF', color: '#000000'}} className="pt-8 shadow-md">
        <div className="p-3 w-28">
          <p>Dessert <br />
          </p>
        </div>
      </Button>
      </div>
    </motion.div>
  )
}

export default SidebarMenu