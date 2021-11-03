import React, {useContext} from 'react'
import { connect } from 'react-redux'
import Lunch from './menu/Lunch.jsx'
import Breakfast from './menu/Breakfast.jsx'
import Sides from './menu/Sides.jsx'

export const Menu = () => {
   //change to useEffect?
   const currentHour = () => {
      const date = new Date()
      return date.getHours()
    }
  // Need to pass in time to sides and drinks as well
  return (
    <div className="justify-items-center w-screen">
      {currentHour() > 11 || currentHour() < 5 ? 
      <Lunch /> :
      <Lunch />
      }
    </div>
  )
}

export default Menu
