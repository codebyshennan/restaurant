import React from 'react'
// import { connect } from 'react-redux'
import {
  Route,
  NavLink,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { motion } from 'framer-motion'
import SplashButtons from './SplashButtons.jsx'

// to set a state for takeout/dinein 
export const Splash = ({dineIn, setDineIn}) => {

  return (
      <div>
        <div id = 'heroText' className = "heroText"><Typography variant="h1" color="initial">This is our food POS app. Designed and developed by Shen Nan and Justin</Typography>
        </div>
        <div className="flex mt-16 justify-center">
          <SplashButtons dineIn={dineIn} setDineIn={setDineIn}/>
          <div className="bg-yellow-300 font-bold h-page flex align-items-center rounded-2xl ml-64">Scan QR Code
          </div>
        </div>
      </div>
  )
}

export default Splash