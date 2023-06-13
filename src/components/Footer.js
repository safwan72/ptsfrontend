import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const foots = [
  "About Us",
  "Feedback",
  "Contact",
  "Brand T & C",
  "FAQ",
  "Offers T & C",
];

const Footer = () => {
  return (
    <Box sx={{ mt: 4, py: 5, pb: 10 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "60%",
          margin: "auto",
          flexWrap: "wrap",
        }}
      >
        {foots?.map((item, index) => (
          <Box
            key={index}
            component={Link}
            sx={{ color: "inherit", textDecoration: "inherit", m: 1 }}
          >
            <Typography variant="caption">{item}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography variant="caption">
          Food shown are for illustration purpose only. Actual product may
          differ from the images shown in this website. The Foodie name, logos,
          and related marks are trademarks of Foodie, Inc.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
