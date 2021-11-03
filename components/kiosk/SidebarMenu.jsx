import Button from '@mui/material/Button'
import { motion } from 'framer-motion'
import {
  NavLink
} from "react-router-dom";

export const SidebarMenu = ({setCategory, setIsMain}) => {
  const setMenu = (itemCategory, itemIsMain) => {
    setCategory(itemCategory)
    setIsMain(itemIsMain)
  }

  return (
    <motion.div className="pt-8 mt-11 w-1/3 justify-items-center"  sx={{ gridArea: 'sidebar' }} initial={{x: -50, opacity: 0}}
    animate={{x: 0, opacity: 1 }} 
    transition={{ duration: 1 }}
    >

      <div className="mt-2 w-auto">
        <Button variant="error" style={{backgroundColor: '#FFFFFF', color: '#000000'}} className="pt-8 shadow-md" onClick={() => {setMenu("main", true)}}>

        <div className="p-3 w-auto">
          <p>Burgers <br />
          </p>
        </div>

      </Button>
      </div>

      <div className="mt-2 w-auto">
        <Button variant="error" style={{backgroundColor: '#FFFFFF', color: '#000000'}} className="pt-8 shadow-md" onClick={() => {setMenu("sides", false)}}>

        <div className="p-3 w-auto">
          <p>Sides <br />
          </p>
        </div>

      </Button>
      </div>

      <div className="mt-2 w-auto">
        <Button variant="error" style={{backgroundColor: '#FFFFFF', color: '#000000'}} className="pt-8 shadow-md" onClick={() => {setMenu("beverage", false)}}>

        <div className="p-3 w-auto">
          <p>Drinks <br />
          </p>
        </div>

      </Button>
      </div>
            <div className="mt-2 w-auto">
        <Button variant="success" style={{backgroundColor: '#FFFFFF', color: '#000000'}} className="pt-8 shadow-md" onClick={() => {setMenu("desserts", false)}}>


        <div className="p-3 w-auto">
          Desserts
        </div>

      </Button>
      </div>
            <div className="mt-2 w-auto">
      <Button variant="error" style={{backgroundColor: '#FFFFFF', color: '#000000'}} className="pt-8 shadow-md" onClick={() => {setMenu("sharing", false)}}>

        <div className="p-3 w-auto">
          <p>Sharing
          </p>
        </div>

      </Button>
      </div>

    </motion.div>
  )
}

export default SidebarMenu