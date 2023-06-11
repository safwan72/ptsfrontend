import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { HOSTURL } from "../utils/hostURL";
import { useParams } from "react-router-dom";
import HOC from "./HOC";
import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
const SingleMenu = () => {
  let { id } = useParams();
  const [dishstate, setdishstate] = React.useState({});
  React.useEffect(() => {
    async function getDishes() {
      const request = await axios.get(`${HOSTURL}dishes/${id}/`);
      setdishstate(...request?.data);
    }
    getDishes();
  }, [id]);
  return (
    <HOC>
      <Box>
        <Typography variant="h4" sx={{ my: 4, textAlign: "center" }}>
          {dishstate?.dish_name}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box sx={{textAlign:'center',margin:'auto'}}>
            <img src={dishstate?.dish_picture} alt={dishstate?.dish_name} height={500} style={{objectFit:'fill',width:'100%'}}/>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">{dishstate?.dish_name}</Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", mt: 1 }}
              gutterBottom
            >
              <span style={{ textDecoration: "line-through" }}>
                {dishstate?.price}&#2547;
              </span>
              &nbsp;
              <span style={{ textDecoration: "none" }}>
                {dishstate?.new_price} &#2547;
              </span>
            </Typography>
            <Box sx={{ my: 1 }}>
              {dishstate?.dish_category?.map((item, index) => (
                <Chip label={item?.name} sx={{m:1}}/>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                my: 1,
              }}
            >
              <Typography variant="caption" sx={{pr:1}}>Description:</Typography>
              <Typography variant="body2">
                {dishstate?.dish_description}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                my: 1,
              }}
            >
              <Typography variant="caption" sx={{pr:1}}>Ingredients:</Typography>
              <pre>
                <Typography variant="body2">
                  {dishstate?.dish_ingredients}
                </Typography>
              </pre>{" "}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </HOC>
  );
};

export default SingleMenu;
