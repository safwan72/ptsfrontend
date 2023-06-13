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
import { styled} from "@mui/material/styles";
import axios from "axios";
import { HOSTURL } from "../../../utils/hostURL";
import Checkbox from "@mui/material/Checkbox";
import { Avatar, Fab } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";



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
export default function AddCategory({ open, handleClick,loader }) {
  const [picstate, setpicstate] = React.useState(null);
  const [showpic, setshowpic] = React.useState(null);

  const { control, handleSubmit, register, reset } = useForm({
    defaultValues: {
      name: "",
      isActive: false,
    },
  });
  React.useEffect(() => {
    reset({
      name: "",
      isActive: false,
    });
  }, [ reset]);
  const onSubmit = (values) => {
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("isActive", values.isActive===false?false:true);
    if (picstate !== null) {
      formData.append("picture", picstate,picstate.name);
    }
//                   // http://127.0.0.1:8000/api/main/dishmodel/
const header = {
headers: {
"Content-Type": "multipart/form-data",
},
};
       let url = `${HOSTURL}categorycreate/`
       axios.post(url, formData,header)
            .then(res => {
              loader();
              handleClick();
                // setloader(false);
            })
            .catch(err => {
                console.log(err);
                loader();
                handleClick();

            })
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClick} fullWidth>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
                      <Box sx={{my:3}}>
            <Typography variant="body2">Category Picture</Typography>
            <Grid
              container
              spacing={2}
              sx={{
                width: "100%",
                alignItems: "center",
              }}
            >
              <Grid item xs={6} sm={6} sx={{ textAlign: "right" }}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="contained-button-file"
                  multiple
                  name="picture"
                  type="file"
                  onChange={(event) => {
                    setshowpic(
                        URL.createObjectURL(event.target.files[0])
                    );
                    setpicstate(event.target.files[0]);

                }}
                />
                <label htmlFor="contained-button-file">
                  <Fab component="span" size="small">
                    <AddAPhotoIcon fontSize="small" />
                  </Fab>
                </label>
              </Grid>
              <Grid item xs={6} sm={6} sx={{textAlign:'left'}}>
                <Avatar
                  alt="Category Picture"
                  src={showpic}
                  sx={{
                    width: 50,
                    height: 50,
                  }}
                />
              </Grid>
            </Grid>
            </Box>
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
                      {...register("isActive")}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
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
              Add
            </ColorButton>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
