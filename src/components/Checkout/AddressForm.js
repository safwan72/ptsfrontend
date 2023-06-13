import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { HOSTURL } from "../../utils/hostURL";
import { useSelector } from "react-redux";

import { Button, styled } from "@mui/material";
const ColorButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: "#F8C544",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#f2b315",
  },
}));

export default function AddressForm(props) {
  const u_id = useSelector((state) => state.user_id);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      zip: "",
      city: "",
      address: "",
      phone: "",
    },
  });
  const onSubmit = (values) => {
    const data = {
      first_name: values.first_name,
      last_name: values.last_name,
      zip: values.zip,
      city: values.city,
      address: values.address,
      phone: values.phone,
    };
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .put(`${HOSTURL}add_address/${u_id}/`, data, header)
      .then((response) => {
        if (response.data) {
          props.handleNext();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  id="first_name"
                  name="first_name"
                  label="First name"
                  fullWidth
                  variant="standard"
                  margin="normal"
                  type="text"
                  autoFocus
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  id="last_name"
                  name="last_name"
                  label="Last name"
                  fullWidth
                  variant="standard"
                  margin="normal"
                  type="text"
                  autoFocus
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth
                  variant="standard"
                  margin="normal"
                  type="text"
                  multiline
                  rows={5}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  fullWidth
                  variant="standard"
                  margin="normal"
                  type="number"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="zip"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  variant="standard"
                  type="number"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <ColorButton type="submit" fullWidth sx={{ mt: 3 }}>
              Save
            </ColorButton>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
