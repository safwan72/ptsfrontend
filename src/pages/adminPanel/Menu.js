import React from 'react'
import HOC from '../../components/adminPanel/HOC'
import axios from 'axios';
import { HOSTURL } from '../../utils/hostURL';
import MyMenu from '../../components/adminPanel/Menu'
import { Box } from '@mui/material';
const Menu = () => {
    const [alldishes, setalldishes] = React.useState([]);
    const [loader, setloader] = React.useState(false);
    React.useEffect(() => {
        async function getData() {
          const request = await axios.get(`${HOSTURL}alldishes/2/`);
          setalldishes(request?.data);
        }
        getData();
      }, [loader]);
      const handleloader=()=>{
        setloader(!loader)
      }
  return (
    <HOC>
        <Box>
            <MyMenu row={alldishes} loader={handleloader}/>
        </Box>

    </HOC>
  )
}

export default Menu