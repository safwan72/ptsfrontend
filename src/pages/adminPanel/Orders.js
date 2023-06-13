import React from 'react'
import HOC from '../../components/adminPanel/HOC'
import axios from 'axios';
import { HOSTURL } from '../../utils/hostURL';
import { Box } from '@mui/material';
import MyOrders from '../../components/adminPanel/Orders'
const Orders = () => {
    const [allorders, setallorders] = React.useState([]);
    const [loader, setloader] = React.useState(false);

    React.useEffect(() => {
        async function getData() {
          const request = await axios.get(`${HOSTURL}all_orders/`);
          setallorders(request?.data);
        }
        getData();
      }, [loader]);
      const handleloader=()=>{
        setloader(!loader)
      }
  return (
    <HOC>
        <Box>
            <MyOrders row={allorders} loader={handleloader}/>
        </Box>
        </HOC>
  )
}

export default Orders