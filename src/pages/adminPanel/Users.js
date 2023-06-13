import React from 'react'
import HOC from '../../components/adminPanel/HOC'
import axios from 'axios';
import { HOSTURL } from '../../utils/hostURL';
import MyUsers from '../../components/adminPanel/Customers'
import { Box } from '@mui/material';

const Users = () => {
    const [allusers, setallusers] = React.useState([]);
    const [loader, setloader] = React.useState(false);

    React.useEffect(() => {
        async function getData() {
          const request = await axios.get(`${HOSTURL}allusers/`);
          setallusers(request?.data);
        }
        getData();
      }, [loader]);
      const handleloader=()=>{
        setloader(!loader)
      }
  return (
    <HOC>
        <Box>
          <MyUsers row={allusers} loader={handleloader}/>
        </Box>

    </HOC>
  )
}

export default Users