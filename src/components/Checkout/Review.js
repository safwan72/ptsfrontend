import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import axios from "axios";
import { HOSTURL } from "../../utils/hostURL";

import { Box, Button, styled } from "@mui/material";
const ColorButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: "#F8C544",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#f2b315",
  },
}));

const header = {
  headers: {
    "Content-Type": "application/json",
  },
};
export default function Review({ handleNext }) {
  const [myorders, setmyorders] = React.useState([]);
  const [myorderitems, setmyorderitems] = React.useState([]);
  const [myaddress, setmyaddress] = React.useState({});
  const u_id = useSelector((state) => state.user_id);

  const val = {
    id: u_id,
  };

  React.useEffect(() => {
    async function getData() {
      const request = await axios.get(`${HOSTURL}my_cart/${u_id}/`);
      setmyorders(request?.data?.order);
      setmyorderitems(request?.data?.order?.items);
      setmyaddress(request?.data?.order?.shipping_address);
    }
    getData();
  }, [u_id]);
  const handlecheckout = () => {
    async function getPosts() {
      const request = await axios.post(
        `${HOSTURL}checkout/${u_id}/`,
        val,
        header
      );

      if (request.status === 200) {
        handleNext();
      }
    }
    return getPosts();
  };
  console.log(myorders);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {myorderitems?.map((product) => (
          <ListItem key={product?.id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product?.dish?.dish_name}
              secondary={`X ${product?.quantity}`}
            />
            <Typography variant="body2">
              {product?.dish_total} &#2547;
            </Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Delivery Charge" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {myorders?.delivery_charge} &#2547;
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {myorders?.total_price_after_discount} &#2547;
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {myorders?.shipping_address?.first_name +
              " " +
              myorders?.shipping_address?.last_name}
          </Typography>
          <Typography gutterBottom>{myaddress?.address} </Typography>
          <Typography gutterBottom>{myaddress?.phone} </Typography>
        </Grid>
      </Grid>
      <Box sx={{ mt: 5 }}>
        <ColorButton fullWidth onClick={() => handlecheckout()}>
          Place order
        </ColorButton>
      </Box>
    </React.Fragment>
  );
}
