import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import {
  Button,
  Divider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from 'react-redux';
import axios from "axios";
import { HOSTURL } from "../utils/hostURL";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: "#F8C544",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#f2b315",
  },
}));
const Cart = ({ open }) => {
  const user_id = useSelector((state) => state?.user_id);

  const theme = useTheme();
  const [myorders, setmyorders] = React.useState([]);
  const [myorderitems, setmyorderitems] = React.useState([]);
  const [coupon, setcoupon] = React.useState([]);
  const [doreload, setdoreload] = React.useState(false);
  const handlereload = () => {
    setdoreload(!doreload);
  };
  const u_id = useSelector((state) => state.user_id);
  React.useEffect(() => {
    async function getData() {
      const request = await axios.get(`${HOSTURL}my_cart/${user_id}/`);
      setmyorders(request?.data?.order);
      setmyorderitems(request?.data?.order?.items);
    }
    getData();
  }, [user_id, doreload]);

  const val = {
    id: u_id,
  };
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return (
    <Drawer anchor="right" open={open}>
      <Box
        role="presentation"
        sx={{
          mt: 10,
          width: 300,
          [theme.breakpoints.down("350")]: {
            width: 220,
          },
          p: 2,
          pr: 0,
        }}
      >
        {myorderitems?(
            <>
            {myorderitems?.map((item, index) => (
                      <Box sx={{ mb: 2 }} key={index}>
                        <Grid
                          container
                          spacing={2}
                          sx={{ alignItems: "center", justifyContent: "center" }}
                        >
                          <Grid item xs={3}>
                            <Box sx={{ wordBreak: "break-word", hyphens: "manual" }}>
                              <Typography variant="caption">
                                {item?.dish?.dish_name}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={3}>
                            <Box>
                              <img
                                src={item?.dish?.dish_picture}
                                alt="Cart"
                                style={{ objectFit: "contain", width: "100%" }}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={3}>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <RemoveIcon
                                onClick={() => {
                                  async function getPosts() {
                                    const request = await axios.post(
                                      `${HOSTURL}decrease_dish/${item.dish?.id}/`,
                                      val,
                                      header
                                    );
                                    setmyorders(request.data.order);
                                    setmyorderitems(request.data.order?.items);
                                    handlereload();
                                  }
                                  getPosts();
                                }}
                                style={{ cursor: "pointer" }}
                              />
                              <Typography variant="caption" sx={{ mr: "3px" }}>
                                {item?.quantity}
                              </Typography>
                              <AddIcon
                                style={{ marginRight: "3px", cursor: "pointer" }}
                                onClick={() => {
                                  async function getPosts() {
                                    const request = await axios.post(
                                      `${HOSTURL}add_dish/${item.dish?.id}/`,
                                      val,
                                      header
                                    );
                                    setmyorders(request.data.order);
                                    setmyorderitems(request.data.order?.items);
                                    handlereload();
                                  }
                                  getPosts();
                                }}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={3}>
                            {item?.dish_total} &#2547;
                          </Grid>
                        </Grid>
                        <Divider />
                      </Box>
                    ))}
                    <Grid
                      container
                      spacing={2}
                      sx={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Grid item xs={6}>
                        <Typography variant="body2">Total :</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          {myorders?.total_price_after_discount} &#2547;
                        </Typography>
                      </Grid>
                    </Grid>
                    {myorders?.coupon && (
                      <Grid
                        container
                        spacing={2}
                        sx={{ alignItems: "center", justifyContent: "center" }}
                      >
                        <Grid item xs={6}>
                          <Typography variant="body2">Discount:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            {myorders?.coupon?.amount} &#2547;
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                    {!myorders?.coupon && (
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          alignItems: "center",
                          justifyContent: "center",
                          my: 5,
                          pr: 1,
                        }}
                      >
                        <Grid item xs={6}>
                          <TextField
                            id="coupon"
                            label="Coupon?"
                            variant="outlined"
                            value={coupon}
                            onChange={(e) => setcoupon(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <ColorButton
                            fullWidth
                            onClick={() => {
                              async function getPosts() {
                                const request = await axios.put(
                                  `${HOSTURL}add_coupon/${u_id}/`,
                                  {
                                    coupon: coupon,
                                  },
                                  header
                                );
                                if (request?.data) {
                                  handlereload();
                                  setcoupon("");
                                }
                              }
                              getPosts();
                            }}
                          >
                            Add
                          </ColorButton>
                        </Grid>
                      </Grid>
                    )}
            
                    <Box sx={{ mt: 8, px: 1 }}>
                        <Link to='/checkout' style={{color:'inherit',textDecoration:"inherit"}}>
                      <ColorButton fullWidth>Proceed To Checkout</ColorButton>
                        </Link>
                    </Box>
            
            </>
        ):(
            <Typography variant="body1" sx={{textAlign:'center'}}>No Items to show</Typography>
        )}

      </Box>
    </Drawer>
  );
};

export default Cart;
