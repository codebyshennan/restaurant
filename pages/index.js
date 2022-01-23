import {useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Wallet from '../components/rewards/Wallet'
import Points from '../components/rewards/Points'


const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



const Home = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Wallet" {...a11yProps(0)} />
            <Tab label="Rewards" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Wallet />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Points />
        </TabPanel>
      </Box>
    </Container>
  );
}

// export const getServerSideProps = async(context) => {
//   // const client = await clientPromise
//   // const db = client.db('fastfood')
//   // const data =  await db.collection('menu').find({}).toArray()

//   // const menuItems = JSON.parse(JSON.stringify(data))
//   // // client.db() will be the default database passed in the MONGODB_URI
//   // // You can change the database by calling the client.db() function and specifying a database like:
//   // // const db = client.db("myDatabase");
//   // // Then you can execute queries against your database like so:
//   // // db.find({}) or any of the MongoDB Node Driver commands

//   // const isConnected = await client.isConnected()

//   return {
//     // props: { isConnected, menuItems },
//   }
// }


/** 
 * export const getStaticProps = async ({ params }) => {
 *  const data = await fetch(`${process.env.APP_DOMAIN}/api/menu/details?item_id=${params.item_id}`)
 *  const item = await data.json()
 * 
 *  return {
 *    props: { item },
 *    revalidate: 60 * 60 * 24
 * }
 *  
 * } 
 */

/**
 * export const getStaticPaths = async() => {
 * 
 * 
 *  return {
 *    paths: [],
 *    fallback: true
 *  }
 * 
 * }
 */


export default Home