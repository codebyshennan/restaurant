import React, {useState, useContext} from 'react'
import Grid from '@mui/material/Grid'
import Item from './Item.jsx'
import { motion } from 'framer-motion'
import Button from '@mui/material/Button'
import {
  NavLink,
  useLocation
} from "react-router-dom";
 
const CartPopUp = () => {
  return (
    <div className="fixed h-full w-full inset-0 bg-green-100 m-auto">
      <div className="absolute inset-1/4 m-auto rounded-t-2xl">
        {props.content}
        <span className="close-icon" onClick={props.handleClose}>Back To Menu</span>
      </div>
    </div>
  );
};
 
export default CartPopUp;