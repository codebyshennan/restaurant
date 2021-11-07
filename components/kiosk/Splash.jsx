import React from 'react'
import {
  NavLink,
} from "react-router-dom";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { motion } from 'framer-motion'
import SplashButtons from './SplashButtons.jsx'
import Image from 'next/image'

// to set a state for takeout/dinein 
export const Splash = ({dineIn, setDineIn}) => {
  return (
      <div>
        <motion.div
        initial={{y: -100, opacity: 0}}
        animate={{y: 0, opacity: 1 }} 
        transition={{ duration: 1 }} 
        >
          <Image src='/img/banner.jpg' alt="POS Banner" height='600' width='1000'/>
        </motion.div>
        <div className="flex mt-16 justify-center">
          <SplashButtons dineIn={dineIn} setDineIn={setDineIn}/>
          <div className="bg-yellow-300 font-bold h-page w-40 align-center rounded-2xl ml-64 flex justify-center">
            <p>Scan QR Code</p>
          </div>
        </div>
      </div>
  )
}

export default Splash