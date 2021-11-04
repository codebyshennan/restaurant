import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import SettingsIcon from '@mui/icons-material/Settings'
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router'

const Navbar = () => {
  let isMain = true
  const router = useRouter()
  if(router.pathname == "/biz/kitchen/settings") {
    isMain = false
  }
  // get router path
  // if router path is settings, render settings
  // else render main

  const handleRefresh = () => {
    // refresh page
    console.log('Refreshing Page')
  }

  const handleSettings = () => {
    router.push('settings')
    console.log('Heading to settings page')
  }

  const handleClose = () => {
    router.push('tracker')
    console.log('Heading back to main')
  }

  const SettingsNav = () => {
    return (
          <>
            <IconButton edge="start" color = "inherit" aria-label="config" sx ={{mr:2}} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant = "h6" color = "inherit" component = "div">
              Settings
            </Typography>
          </>
        )
  }


  const MainNav = () => {
    return (
      <>
        <IconButton edge="start" color = "inherit" aria-label="config" sx ={{mr:2}} onClick={handleSettings}>
          <SettingsIcon />
        </IconButton>
        <IconButton edge="start" color = "inherit" aria-label="config" sx ={{mr:2}} onClick={handleRefresh}>
          <RefreshIcon />
        </IconButton>
        <Typography variant = "h6" color = "inherit" component = "div">
          Kitchen
        </Typography>
      </>
    )
  }

  return (
    <Box sx={{flexGrow :1}}>
      <AppBar position = "static" color ="transparent">
        <Toolbar variant = "dense" >
          { isMain ? <MainNav /> : <SettingsNav />}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
