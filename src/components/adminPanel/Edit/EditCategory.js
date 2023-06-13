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
export default function EditCategory({ open, handleClick, loader,id }) {

  const [mycategory, setmycategory] = React.useState({});
  React.useEffect(() => {
    async function getData() {
        if(id){
            const request = await axios.get(`${HOSTURL}category/${id}/`);
            setmycategory(request?.data?.category);
        }
    }
    getData();
  }, [id]);
console.log(mycategory?.isActive)
  const { control, handleSubmit, register, reset } = useForm({
    defaultValues: {
      name: mycategory?.name?mycategory?.name:'',
      isActive: Boolean(mycategory?mycategory?.isActive:false),
    },
  });
  React.useEffect(() => {
    reset({
        name: mycategory?.name?mycategory?.name:'',
        isActive: Boolean(mycategory?mycategory?.isActive:false),
    });
  }, [mycategory, reset]);
  const onSubmit = (values) => {
    const data={
        name: values.name,
        isActive: Boolean(values.isActive)
    }
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let url = `${HOSTURL}updatecategory/${id}/`;
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
            <Box sx={{ my: 1 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    margin="normal"
                    fullWidth
                    id="name"
                    label="Category Name"
                    name="name"
                    type="text"
                    inputRef={register("name")}
                  />
                )}
              />
            </Box>
            <Grid container sx={{ alignItems: "center", my: 1 }}>
              <Grid item xs={2}>
                <Typography variant="body2">Active</Typography>
              </Grid>
              <Grid item xs={10}>
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      name="isActive"
                      id="isActive"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      {...register("isActive")}
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
