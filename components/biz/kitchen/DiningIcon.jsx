// MEAL ITEM ICONS
import FastfoodIcon from '@mui/icons-material/Fastfood'; // set
import LunchDiningIcon from '@mui/icons-material/LunchDining'; // burger
import LocalBarIcon from '@mui/icons-material/LocalBar'; // drink
import LocalPizzaIcon from '@mui/icons-material/LocalPizza'; // side
import CakeIcon from '@mui/icons-material/Cake'; // dessert

const DiningIcon = ({type}) => {

    if (type == "main") {
      return <LunchDiningIcon />
    } else if (type == "sides") {
      return <LocalPizzaIcon />
    } else if(type == "beverage") {
      return <LocalBarIcon />
    } else if (type == "desserts") {
      return <CakeIcon />
    } else {
      return null
    }
  }

export default DiningIcon