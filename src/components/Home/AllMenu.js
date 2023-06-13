import axios from "axios";
import React from "react";
import { HOSTURL } from "../../utils/hostURL";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AllMenuItem from "./MenuItem";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import SortIcon from "@mui/icons-material/Sort";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Slider from "@mui/material/Slider";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "10px",
  backgroundColor: alpha("#F8C544", 0.3),
  "&:hover": {
    backgroundColor: alpha("#F8C544", 0.5),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const ColorButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: "#F8C544",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#f2b315",
  },
}));

const AllMenu = ({ home }) => {
  const [alldishes, setalldishes] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  React.useEffect(() => {
    async function getData() {
      const request = await axios.get(`${HOSTURL}alldishes/${home ? 0 : 1}/`);
      setalldishes(request?.data);
    }
    getData();
  }, [home]);
  const [categories, setcategories] = React.useState([]);
  React.useEffect(() => {
    async function getData() {
      const request = await axios.get(`${HOSTURL}allcategories/`);
      setcategories(request?.data);
    }
    getData();
  }, []);
  function valuetext(value) {
    return `${value}`;
  }
  const getDishes = (id) => {
    async function getData() {
      const request = await axios.get(`${HOSTURL}category/${id}/`);
      setalldishes(request?.data?.dishes);
      handleClose();
    }
    getData();
  };
  const handleSearch = (searchText) => {
    if (searchText) {
      const filteredRows = alldishes?.filter((row) => {
        return row.dish_name.toLowerCase().includes(searchText?.toLowerCase());
      });
      setalldishes(filteredRows);
    } else {
      async function getData() {
        const request = await axios.get(`${HOSTURL}alldishes/${home ? 0 : 1}/`);
        setalldishes(request?.data);
      }
      getData();
    }
  };
  const [value, setValue] = React.useState(300);
  const getDishesByPrice = () => {
    async function getData() {
      const request = await axios.get(`${HOSTURL}dishPrice/${value}/`);
      setalldishes(request?.data);
      handleClose();
    }
    getData();
  };

  const handleChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };
  return (
    <Box sx={{ mt: 4 }}>
      {home && (
        <Box
          sx={{
            my: 4,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Link to="/menu">
            <ColorButton variant="contained">See Full Menu</ColorButton>
          </Link>
        </Box>
      )}
      <Typography variant="h5" sx={{ textAlign: "center", mb: 4 }}>
        {" "}
        See Our Menu{" "}
      </Typography>
      {!home && (
        <Box sx={{ my: 5 }}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <IconButton aria-label="sort" onClick={handleClick}>
                <SortIcon />
              </IconButton>
              <Popover
                sx={{ width: "75%" }}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Box>
                  <Box sx={{ p: 1, mx: 2 }}>
                    <Typography sx={{ mt: 5, ml: 1 }} variant="caption">
                      Category
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        p: 1,
                      }}
                    >
                      {categories?.map((item, index) => (
                        <Chip
                          label={item?.name}
                          sx={{ m: 1 }}
                          key={item?.id}
                          onClick={() => getDishes(item?.id)}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ p: 1, mx: 2 }}>
                    <Typography sx={{ mt: 5, ml: 1 }} variant="caption">
                      Price
                    </Typography>
                    <Slider
                      aria-label="Price"
                      size="small"
                      value={value}
                      getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      step={150}
                      marks
                      min={150}
                      max={1500}
                      onChange={handleChange}
                      onChangeCommitted={() => {
                        getDishesByPrice();
                      }}
                    />
                  </Box>
                </Box>
              </Popover>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Search
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Grid>
          </Grid>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {categories?.map((item, index) => (
          <Box
            key={item?.id}
            sx={{ marginBottom: "5px", marginRight: "5px" }}
            onClick={() => getDishes(item?.id)}
          >
            <ColorButton variant="contained">{item?.name}</ColorButton>
          </Box>
        ))}
      </Box>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        {alldishes?.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <AllMenuItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllMenu;
