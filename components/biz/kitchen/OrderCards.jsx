import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import CardHeader from '@mui/material/CardHeader'
import { red } from '@mui/material/colors';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Divider from '@mui/material/Divider'
import ListSubheader from '@mui/material/ListSubheader';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

const OrderCards = ({orders}) => {
  // parse the orders into respective cards
  // include pagination and user opts on views per page
  // orders should have mode of delivery (eat in or take out)


  return (
    <div className="flex flex-row flex-initial space-x-2">
      {/* TEST CARD 1 */}
      <Card sx={{ maxWidth: 275 }}>
        <CardHeader
          title={
            <Typography variant="h5" component="div">
              Order #
            </Typography>
          }
          subheader={
            <Typography variant="overline">
              Sep 14, 2021
            </Typography>
          } // date of receipt
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              <RestaurantIcon />
            </Avatar>
          }
        />
        <Divider />
        <CardContent>
          
          <Typography sx={{marginBottom: 1, lineHeight: 1}} variant="h5" component="div">
            <Typography variant="overline" component="span">
              <sup>
                FULFIL  
              </sup>
            </Typography>
            {'  '}
            14:00
            {'  '}
            <Typography variant="overline" component="span">
              <sup>
                BY  
              </sup>
            </Typography>

          </Typography>
          <Divider variant="middle" />
        </CardContent>
        <Grid container>
          <Grid item>
            <List sx={{ width: '100%' }} subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            ITEMS
          </ListSubheader>
        }>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Single-line item"
                  secondary='Secondary text'
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          </Grid>
        </Grid>
      </Card>

      {/* TEST CARD 2 */}
      <Card sx={{ maxWidth: 275 }}>
        <CardHeader
          title={
            <Typography variant="h5" component="div">
              Order #
            </Typography>
          }
          subheader={
            <Typography variant="overline">
              Sep 14, 2021
            </Typography>
          } // date of receipt
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              <DeliveryDiningIcon />
            </Avatar>
          }
        />
        <Divider />
        <CardContent>
          
          <Typography sx={{marginBottom: 1, lineHeight: 1}} variant="h5" component="div">
            <Typography variant="overline" component="span">
              <sup>
                FULFIL  
              </sup>
            </Typography>
            {'  '}
            14:00
            {'  '}
            <Typography variant="overline" component="span">
              <sup>
                BY  
              </sup>
            </Typography>

          </Typography>
          <Divider variant="middle" />
        </CardContent>
        <Grid container>
          <Grid item>
            <List sx={{ width: '100%' }} subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            ITEMS
          </ListSubheader>
        }>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Single-line item"
                  secondary='Secondary text'
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

export default OrderCards
