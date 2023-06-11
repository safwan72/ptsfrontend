import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { HOSTURL } from "../utils/hostURL";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Person2Icon from '@mui/icons-material/Person2';
import { useTheme } from '@mui/material/styles';
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const drawerWidth = 180;


const settings = ["profile", "menu", "logout"];




const HOC = ({children}) => {
    const [open, setopen] = React.useState(false);
    const theme = useTheme();
    const handleopen = () => {
      setopen(!open);
    };
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const user_id = useSelector((state) => state?.user_id);
    const loading = useSelector((state) => state?.loading);

  
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
    const [categories, setcategories] = React.useState([]);
    React.useEffect(() => {
      async function getData() {
        const request = await axios.get(`${HOSTURL}allcategories/`);
        setcategories(request.data);
      }
      getData();
    }, []);
    const [userDetails, setuserDetails] = React.useState({});
    React.useEffect(() => {
      async function getData() {
        const request = await axios.get(`${HOSTURL}customerupdate/${user_id}/`);
        setuserDetails(request?.data);
      }
      getData();
    }, [user_id,loading]);
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "white",
            color: "black",
            minHeight: 80,
            py: 1,
            boxShadow:'none'
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleopen}
              edge="start"
              sx={{
                marginRight: 1,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/">
              <Box component="img" sx={{ height: 25, mr:1,[theme.breakpoints.up('sm')]:{
                height:40
              } }} alt="Logo" src={Logo} />
            </Link>
            <Box sx={{ flexGrow: 1 }} />

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                marginRight: 1,
              }}
            >
                            <Link to='/profile' style={{color:'inherit',textDecoration:"inherit"}}>
              <ShoppingCartIcon />
              </Link>
            </IconButton>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                marginRight: 1,
              }}
            >
              <Link to='/profile' style={{color:'inherit',textDecoration:"inherit"}}>
              <Person2Icon />
              </Link>
            </IconButton>
            <Box sx={{ flexGrow: 0}}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={userDetails?.profile_pic} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting,index) => (
                      <Link to={`/${setting}`} key={index} style={{color:'inherit',textDecoration:"inherit"}}>
                    <MenuItem >
                    <Typography textAlign="center" sx={{textTransform:'capitalize'}}>{setting}</Typography>
                  </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: open ? drawerWidth : 75,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: open ? drawerWidth : 75,
              boxSizing: "border-box",
              border: "none",
              pt:1
            },
          }}
        >
          <Toolbar />
          <Box
            sx={{
              overflow: "auto",
              backgroundColor: "#F8C544",
              height:'100%',
              mt:2,
              borderRadius:'12px',
            }}
          >
            <List>
              {categories?.map((data, index) => (
                <Link key={data?.id} to={`/category/${data?.id}/`} style={{color:'inherit',textDecoration:"inherit"}}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ justifyContent: "center",display:'flex',flexDirection:'column',alignItems:'center' }}
                    title={data?.name}
                  >
                    <ListItemAvatar>
                      <Box
                        sx={{ width: 40, height: 40,
                          display:'flex',
                          alignItems:'center',
                          justifyContent:'center',
                          margin:'auto'
                      }}
                      >
                          <img alt={data?.name}
                        src={data?.picture}
                        style={{width:'100%',objectFit:'fill',
                        objectPosition:'center',height:'100%',}}
                        />
                          </Box>
                    </ListItemAvatar>
                    {open ? <ListItemText primary={data?.name} /> : ""}
                  </ListItemButton>
                </ListItem>
                </Link>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
{children}
<Footer/>
        </Box>
      </Box>
    );
}

export default HOC