import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
const MenuItem = ({item}) => {

    return (
      <Card sx={{ maxWidth: 300,margin:'auto'}}>
        <CardMedia
          component="img"
          height="194"
          image={item?.dish_picture}
          alt={item?.dish_name}
        />
        <Link to={`/menu/${item?.id}`} style={{color:'inherit',textDecoration:"inherit"}}>
        <CardContent>
        <Typography gutterBottom variant="h6" component="div">
        {item?.dish_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {item?.dish_description}
          </Typography>
          <Typography variant="subtitle1" sx={{fontWeight:'bold',mt:1}} gutterBottom>
            <span style={{textDecoration:'line-through'}}>{item?.price}&#2547;</span>
            &nbsp;
          <span style={{textDecoration:'none'}}>{item?.new_price} &#2547;</span>
           </Typography>
        </CardContent>
      </Link>
        <CardActions disableSpacing>
          <IconButton aria-label="add to cart" title='Add to Cart'>
            <AddShoppingCartIcon />
          </IconButton>
          <IconButton aria-label="save">
            <FavoriteBorderIcon />
          </IconButton>
        </CardActions>
      </Card>

    );
}

export default MenuItem