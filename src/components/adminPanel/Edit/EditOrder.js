import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { HOSTURL } from "../../../utils/hostURL";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import ListItemText from "@mui/material/ListItemText";

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
export default function EditOrder({ open, handleClick, loader, id }) {
  const [myorder, setmyorder] = React.useState({});
  React.useEffect(() => {
    async function getData() {
      if (id) {
        const request = await axios.get(`${HOSTURL}order_by_id/${id}/`);
        setmyorder(...request?.data);
      }
    }
    getData();
  }, [id]);
  const { control, handleSubmit, register, reset } = useForm({
    defaultValues: {
      ordered: Boolean(myorder ? myorder?.ordered : false),
      order_status: myorder?.order_status ? myorder?.order_status : "",
      delivery_charge: myorder?.delivery_charge ? myorder?.delivery_charge : "",
      delivered: Boolean(myorder?.delivered ? myorder?.delivered : false),
      received: Boolean(myorder?.received ? myorder?.received : false),
    },
  });
  const STATUS_CHOICES=[
    {
      'name':'UnConfirmed',
      'value':'UnConfirmed'
    },
    {
      'name':'Confirmed',
      'value':'Confirmed'
    },
    {
      'name':'Shipped',
      'value':'Shipped'
    },
    {
      'name':'Delivered',
      'value':'Delivered'
    },
    {
      'name':'Receieved',
      'value':'Receieved'
    }
  ]

  React.useEffect(() => {
    reset({
      ordered: Boolean(myorder ? myorder?.ordered : false),
      order_status: myorder?.order_status ? myorder?.order_status : "",
      delivery_charge: myorder?.delivery_charge ? myorder?.delivery_charge : "",
      delivered: Boolean(myorder?.delivered ? myorder?.delivered : false),
      received: Boolean(myorder?.received ? myorder?.received : false),
    });
  }, [myorder, reset]);
  const onSubmit = (values) => {
    const data = {
      ordered: values.ordered ,
      order_status: values.order_status,
      delivery_charge: values.delivery_charge,
      delivered: values.delivered ,
      received: values.received ,
    };
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let url = `${HOSTURL}order_by_id_edit/${id}/`;
    axios
      .post(url, data, header)
      .then((res) => {
        loader();
        handleClick();
      })
      .catch((err) => {
        loader();
        handleClick();
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClick} fullWidth>
        <DialogTitle>Add New Dish</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ my: 3 }}>
              <Controller
                control={control}
                name="order_status"
                render={({ field }) => {
                  return (
                    <Select
                      style={{ width: "100%" }}
                      {...field}
                      displayEmpty={true}
                      inputRef={register("order_status")}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          <Chip label={selected} />
                        </Box>
                      )}
                    >
                      <MenuItem disabled>
                        <ListItemText primary="Select Status" />
                      </MenuItem>
                      {STATUS_CHOICES?.map((option) => (
                        <MenuItem key={option.id} value={option?.name}>
                          <ListItemText primary={option?.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  );
                }}
              />
            </Box>

            <Grid container sx={{ alignItems: "center", my: 1 }}>
              <Grid item xs={2}>
                <Typography variant="body2">Ordered</Typography>
              </Grid>
              <Grid item xs={10}>
                <Controller
                  name="ordered"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      name="ordered"
                      id="ordered"
                      {...register("ordered")}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container sx={{ alignItems: "center", my: 1 }}>
              <Grid item xs={2}>
                <Typography variant="body2">Delivered</Typography>
              </Grid>
              <Grid item xs={10}>
                <Controller
                  name="delivered"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      {...register("delivered")}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container sx={{ alignItems: "center", my: 1 }}>
              <Grid item xs={2}>
                <Typography variant="body2">Received</Typography>
              </Grid>
              <Grid item xs={10}>
                <Controller
                  name="received"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      {...register("received")}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Box sx={{ my: 1 }}>
              <Controller
                name="delivery_charge"
                control={control}
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    margin="normal"
                    fullWidth
                    id="delivery_charge"
                    label="Delivery Charge"
                    name="delivery_charge"
                    type="number"
                    inputRef={register("delivery_charge")}
                  />
                )}
              />
            </Box>
            <ColorButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </ColorButton>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
