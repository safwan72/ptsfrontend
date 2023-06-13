import React from 'react'
import HOC from '../../components/adminPanel/HOC'
import axios from 'axios';
import { HOSTURL } from '../../utils/hostURL';
import MyCategory from '../../components/adminPanel/Category'
import { Box } from '@mui/material';

const Category = () => {
    const [allcategories, setallcategories] = React.useState([]);
    const [loader, setloader] = React.useState(false);

    React.useEffect(() => {
        async function getData() {
          const request = await axios.get(`${HOSTURL}allcategories/`);
          setallcategories(request?.data);
        }
        getData();
      }, [loader]);
      const handleloader=()=>{
        setloader(!loader)
      }
  return (
    <HOC>
        <Box>
            <MyCategory row={allcategories} loader={handleloader}/>
        </Box>

    </HOC>
  )
}

export default Category