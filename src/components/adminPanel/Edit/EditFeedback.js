import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { HOSTURL } from "../../../utils/hostURL";
import Checkbox from "@mui/material/Checkbox";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: "#F8C544",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#f2b315",
  },
}));
export default function EditFeedback({ open, handleClick, loader,id }) {

  const [myfeedback, setmyfeedback] = React.useState({});
  React.useEffect(() => {
    async function getData() {
        if(id){
            const request = await axios.get(`${HOSTURL}feedback/${id}/`);
            setmyfeedback(...request?.data);
        }
    }
    getData();
  }, [id]);
  console.log(myfeedback)
  const { control, handleSubmit, register, reset } = useForm({
    defaultValues: {
      resolved: Boolean(myfeedback?myfeedback?.resolved:false),
    },
  });
  React.useEffect(() => {
    reset({
        resolved: Boolean(myfeedback?myfeedback?.resolved:false),

    });
  }, [myfeedback, reset]);
  const onSubmit = (values) => {
    const data={
        name: values.name,
        resolved: Boolean(values.resolved)
    }
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let url = `${HOSTURL}editfeedback/${id}/`;
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
        <Grid container sx={{ alignItems: "center", my: 3 }}>
              <Grid item xs={2}>
                <Typography variant="body2">Phone</Typography>
              </Grid>
              <Grid item xs={10}>
              <Typography variant="body2">{myfeedback?.phone}</Typography>

              </Grid>
            </Grid>
        <Grid container sx={{ alignItems: "center", my: 3 }}>
              <Grid item xs={2}>
                <Typography variant="body2">Email</Typography>
              </Grid>
              <Grid item xs={10}>
              <Typography variant="body2">{myfeedback?.email}</Typography>

              </Grid>
            </Grid>
        <Grid container sx={{ alignItems: "flex-start", my: 3 }}>
              <Grid item xs={2}>
                <Typography variant="body2">Message</Typography>
              </Grid>
              <Grid item xs={10}>
              <Typography variant="body2">{myfeedback?.message}</Typography>

              </Grid>
            </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container sx={{ alignItems: "center", my: 1 }}>
              <Grid item xs={2}>
                <Typography variant="body2">Resolve</Typography>
              </Grid>
              <Grid item xs={10}>
                <Controller
                  name="resolved"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      name="resolved"
                      id="resolved"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      {...register("resolved")}
                    />
                  )}
                />
              </Grid>
            </Grid>

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
