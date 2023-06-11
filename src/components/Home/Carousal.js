import React from 'react'
import Carousel from 'react-material-ui-carousel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Card from '@mui/material/Card';
import { CardMedia } from '@mui/material';
import axios from 'axios';
import { HOSTURL } from '../../utils/hostURL';
import { Link } from 'react-router-dom';

const Carousal = () => {
    const [featured, setfeatured] = React.useState([]);
    React.useEffect(() => {
      async function getData() {
        const request = await axios.get(`${HOSTURL}featuredishes/`);
        setfeatured(request.data);
      }
      getData();
    }, []);

  return (
    <Carousel autoPlay interval={4000} stopAutoPlayOnHover animation='slide' swipe indicators NextIcon={<NavigateNextIcon/>} PrevIcon={<NavigateNextIcon/>} height={205}>
        {featured?.map((item,index)=>(
                <Link to={`/menu/${item?.id}`} style={{color:'inherit',textDecoration:"inherit"}}>

  <Card key={index}>
    <div style={{ position: "relative" }}>
      <CardMedia sx={{ objectFit: "cover"}} height="200" component="img" image={item?.dish_picture} title={item?.dish_name} alt={item?.dish_name}/> 
      <div style={{position: "absolute", backgroundColor:'rgba(0,0,0,0.6)',color: "white",top: "35%",left: "50%",transform: "translateX(-50%)",width:'100%',textAlign:'center',padding:"5px",fontWeight:'bold'}}>{item?.dish_name} 
      &nbsp; {item?.new_price} &#2547;
      </div>
  </div>
</Card>
</Link>

        ))}
    {/* <div style={Object.assign({}, styles.slide, styles.slide1)}>
      slide n°1
    </div>
    <div style={Object.assign({}, styles.slide, styles.slide2)}>
      slide n°2
    </div>
    <div style={Object.assign({}, styles.slide, styles.slide3)}>
      slide n°3
    </div> */}
  </Carousel>
  )
}

export default Carousal