import React from "react";
import HOC from "./HOC";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useSelector, connect } from "react-redux";
import axios from "axios";
import { HOSTURL } from "../utils/hostURL";
import Avatar from "@mui/material/Avatar";
import * as actions from "../app/actioncreator";
import { useNavigate } from "react-router-dom";
const CssTextField = styled(TextField)({
  "& input": {
    color: "black",
  },
  "& label.Mui-focused": {
    color: "black",
  },
  "& fieldset": {
    border: "1px solid black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
  "& .MuiFormLabel-root": {
    color: "black",
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: "#F8C544",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#f2b315",
  },
}));

const mapDispatchToProps = (dispatch) => {
  return {
    loading: (load) => dispatch(actions.loading(load)),
  };
};

const Profile = (props) => {
  const [picstate, setpicstate] = React.useState(null);
  const [showpic, setshowpic] = React.useState(null);
  const user_id = useSelector((state) => state?.user_id);
  const isAdmin = useSelector((state) => state?.user_details?.isAdmin);
  const theme = useTheme();
  const navigate = useNavigate();

  const [userDetails, setuserDetails] = React.useState({});
  React.useEffect(() => {
    async function getData() {
      if (isAdmin) {
        const request = await axios.get(`${HOSTURL}adminupdate/${user_id}/`);
        setuserDetails(request?.data);
        setshowpic(request?.data?.profile_pic);
      } else {
        const request = await axios.get(`${HOSTURL}customerupdate/${user_id}/`);
        setuserDetails(request?.data);
        setshowpic(request?.data?.profile_pic);
      }
    }
    getData();
  }, [user_id, isAdmin]);
  const { control, handleSubmit, register, reset } = useForm({
    defaultValues: {
      phone: userDetails?.phone ? userDetails?.phone : "",
      address: userDetails?.address ? userDetails?.address : "",
      full_name: userDetails?.full_name ? userDetails?.full_name : "",
    },
  });
  React.useEffect(() => {
    reset({
      phone: userDetails?.phone ? userDetails?.phone : "",
      address: userDetails?.address ? userDetails?.address : "",
      full_name: userDetails?.full_name ? userDetails?.full_name : "",
    });
  }, [reset, userDetails]);

  const onSubmit = (values) => {
    let formdata = new FormData();
    const user = {
      username: values.username,
      email: values.email,
      id: user_id,
    };
    formdata.append("user", user);
    formdata.append("full_name", values.full_name);
    formdata.append("address", values.address);
    formdata.append("phone", values.phone);
    if (picstate !== null) {
      formdata.append("profile_pic", picstate);
    } else {
      formdata.append("profile_pic", null);
    }
    let url = null;
    if (isAdmin) {
      url = `${HOSTURL}adminupdate/${user_id}/`;
    } else {
      url = `${HOSTURL}customerupdate/${user_id}/`;
    }
    axios
      .put(url, formdata)
      .then((res) => {
        setuserDetails(res?.data);
        // setloader(false);
      })
      .catch((err) => {
        console.log(err);
      });
    return navigate("/home");
  };
  return (
    <HOC>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Profile
        </Typography>
        <Box sx={{ mt: 3, mb: 5 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              spacing={2}
              sx={{
                width: "100%",
                margin: "auto",
                alignItems: "center",
                [theme.breakpoints.up("sm")]: {
                  width: "60%",
                },
              }}
            >
              <Grid item xs={6} sm={6} sx={{ textAlign: "right" }}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={(event) => {
                    setshowpic(URL.createObjectURL(event.target.files[0]));
                    setpicstate(event.target.files[0]);
                  }}
                />
                <label htmlFor="contained-button-file">
                  <Fab component="span" size="small">
                    <AddAPhotoIcon fontSize="small" />
                  </Fab>
                </label>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Avatar
                  alt="Profile Picture"
                  src={showpic}
                  sx={{
                    width: 50,
                    height: 50,
                    [theme.breakpoints.up("sm")]: {
                      width: 80,
                      height: 80,
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ my: 1, mt: 5 }}>
              <Grid container spacing={2} sx={{ wordBreak: "break-word" }}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption">Username :</Typography>
                </Grid>
                <Grid item xs={6} sm={3} sx={{ textAlign: "left" }}>
                  <Typography variant="caption">
                    {userDetails?.user?.username}
                  </Typography>
                </Grid>
                <Grid item xs={0} sm={6} sx={{ textAlign: "left" }}></Grid>
              </Grid>
            </Box>
            <Box sx={{ my: 1 }}>
              <Grid container spacing={2} sx={{ wordBreak: "break-word" }}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption">Full Name :</Typography>
                </Grid>
                <Grid item xs={6} sm={3} sx={{ textAlign: "left" }}>
                  <Typography variant="caption">
                    {userDetails?.full_name}
                  </Typography>
                </Grid>
                <Grid item xs={0} sm={6} sx={{ textAlign: "left" }}></Grid>
              </Grid>
            </Box>
            <Box sx={{ my: 1, mt: 2 }}>
              <Grid container spacing={2} sx={{ wordBreak: "break-word" }}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption">Email :</Typography>
                </Grid>
                <Grid item xs={6} sm={3} sx={{ textAlign: "left" }}>
                  <Typography variant="caption">
                    {userDetails?.user?.email}
                  </Typography>
                </Grid>
                <Grid item xs={0} sm={6} sx={{ textAlign: "left" }}></Grid>
              </Grid>
            </Box>
            <Controller
              name="full_name"
              control={control}
              render={({ field }) => (
                <CssTextField
                  {...field}
                  margin="normal"
                  fullWidth
                  id="full_name"
                  label="Full Name"
                  name="full_name"
                  type="text"
                  inputRef={register("full_name")}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <CssTextField
                  {...field}
                  margin="normal"
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  type="number"
                  inputRef={register("phone")}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <CssTextField
                  {...field}
                  margin="normal"
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  type="text"
                  inputRef={register("address")}
                />
              )}
            />
            <ColorButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </ColorButton>
          </form>
        </Box>
      </Box>
    </HOC>
  );
};

export default connect(null, mapDispatchToProps)(Profile);
