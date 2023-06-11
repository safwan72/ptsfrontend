import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { HOSTURL } from "../utils/hostURL";
import { useParams } from "react-router-dom";
import HOC from "./HOC";
import AllMenuItem from "../components/Home/MenuItem";

const SingleCategory = () => {
  let { id } = useParams();
  const [category, setcategory] = React.useState([]);
  React.useEffect(() => {
    async function getDishes() {
      const request = await axios.get(`${HOSTURL}category/${id}/`);
      setcategory(request?.data);
    }
    getDishes();
  }, [id]);
  console.log(category);
  return (
    <HOC>
      <Box sx={{my:4}}>
        <Typography variant="h4" sx={{textAlign:'center'}}>{category?.category?.name}</Typography>
      </Box>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        {category?.dishes?.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <AllMenuItem item={item} />
          </Grid>
        ))}
      </Grid>
    </HOC>
  );
};

export default SingleCategory;
