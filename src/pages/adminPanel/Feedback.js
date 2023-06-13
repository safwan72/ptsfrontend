import React from 'react'
import HOC from '../../components/adminPanel/HOC'
import axios from 'axios';
import { HOSTURL } from '../../utils/hostURL';
import MyFeedback from '../../components/adminPanel/Feedback'
import { Box } from '@mui/material';

const Feedback = () => {
    const [allfeedbacks, setallfeedbacks] = React.useState([]);
    const [loader, setloader] = React.useState(false);

    React.useEffect(() => {
        async function getData() {
          const request = await axios.get(`${HOSTURL}allfeedback/`);
          setallfeedbacks(request?.data);
        }
        getData();
      }, [loader]);
      const handleloader=()=>{
        setloader(!loader)
      }
  return (
    <HOC>
        <Box>
            <MyFeedback row={allfeedbacks} loader={handleloader}/>
        </Box>

    </HOC>
  )
}

export default Feedback