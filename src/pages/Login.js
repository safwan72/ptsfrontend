import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LoginPageLogo from "../images/frontpage.png";
import Logo from "../images/Untitled.png";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import * as actions from "../app/actioncreator";
import { connect } from "react-redux";
import axios from "axios";
import { HOSTURL } from "../utils/hostURL";

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (val) => dispatch(actions.authload(val)),
  };
};
function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://safwanali.netlify.app/home"
        sx={{ textDecoration: "none" }}
      >
        Safwan
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const CssTextField = styled(TextField)({
  "& input": {
    color: "white",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& fieldset": {
    border: "1px solid white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& .MuiFormLabel-root": {
    color: "white",
  },
});
const Login = (props) => {
  const [state, setstate] = React.useState(true);
  const handlestate = () => {
    setstate(!state);
  };
  const notify = (message) => toast(message);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      cpassword: "",
    },
  });
  const onSubmit = (values) => {
    if (state) {
      const data = {
        email: values.email,
        password: values.password,
      };
      props.auth(data);
      notify("Login Successful");
    } else {
      const data = {
        email: values.email,
        username: values.username,
        password: values.password,
      };
      const header = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post(`${HOSTURL}newuser/`, data, header)
        .then((response) => {
          if (response.data) {
            notify("Account Creation Successful.Please Login Now.");
            setstate(true);
          }
        })
        .catch((error) => {
          notify("Something Went Wrong. Try Again Please.");
        });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#FBBF24",
            color: "#fff",
          },
        }}
      />
      <Grid
        container
        component="main"
        sx={{
          backgroundImage: `url(${LoginPageLogo})`,
          minHeight: "100vh",
          minWidth: "100%",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          sx={{ backgroundColor: "rgba( 0, 0, 0,0.7)", color: "white" }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src={Logo}
              sx={{ width: 200, height: 70, mb: 3, borderRadius: 0 }}
            ></Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ cursor: "pointer", mr: 1 }}
              onClick={() => {
                handlestate();
              }}
            >
              {state ? "Login" : "Sign in"}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <CssTextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      type="email"
                      autoFocus
                    />
                  )}
                />
                {!state && (
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <CssTextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        type="text"
                      />
                    )}
                  />
                )}
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <CssTextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                    />
                  )}
                />
                {!state && (
                  <Controller
                    name="cpassword"
                    control={control}
                    render={({ field }) => (
                      <CssTextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        name="cpassword"
                        label="Confirm Password"
                        type="password"
                        id="cpassword"
                      />
                    )}
                  />
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {state ? "Login" : "Sign in"}
                </Button>
              </form>
              <Grid container>
                <Grid item>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    variant="body2"
                    onClick={() => {
                      handlestate();
                    }}
                  >
                    {state
                      ? "Don't have an account? Sign Up"
                      : "Already have an account? Login"}
                  </Typography>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default connect(null, mapDispatchToProps)(Login);
