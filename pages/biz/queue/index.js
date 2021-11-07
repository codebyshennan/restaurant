import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import useSWR from 'swr'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const fetcher = (...args) => fetch(...args).then(res=> res.json())


const ShowQueue = () => {

  
  // continuously fetch data from server
  const { data, error } = useSWR('/api/kitchen/orders', fetcher, { refreshInterval: 1000 })

  const Loader = ({message}) => {
    return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >

      <Grid item xs={3}>
      { message == "loading" ? <CircularProgress /> : "Error: Failed to load"}
      </Grid>   
      
    </Grid> 
    )
  }


  if (error) return (<Loader message={"failed"} />)
  if (!data) return (<Loader message={"loading"} />)

  const stillProcessing = data && 
                            data
                            .filter(order => order.status == "processing")
                            .map(order=> {return order.queue})
  const readyForCollection = data && 
                              data
                              .filter(order => order.status == "ready")
                              .map(order=> {return order.queue})


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
             <Typography variant="h3" component="div" gutterBottom>
               Ready for Collection
            </Typography>

            <Divider />
              {JSON.stringify(readyForCollection)}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
           <Typography variant="h3" component="div" gutterBottom>
        Preparing
      </Typography>
      <Divider />
      {JSON.stringify(stillProcessing)}
      </Item>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ShowQueue
