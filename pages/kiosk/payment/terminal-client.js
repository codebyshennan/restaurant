
import React, { useEffect, useRef, useState } from 'react'
// import Terminal from '../../../components/payments/stripe/Terminal'
import dynamic from 'next/dynamic'
import {loadStripeTerminal } from '@stripe/terminal-js/pure';
import 'tailwindcss/tailwind.css'


// const DynamicComponent = dynamic(() => import('@stripe/terminal-js'))
const TerminalClient = () => {

 const openTerminal = () => {

  window.open('/kiosk/terminal', 
              'targetWindow',
              'directories=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=250,height=450')
 }


return ( 

  <button onClick={openTerminal}> OPEN </button>
    
)

}

export default TerminalClient
