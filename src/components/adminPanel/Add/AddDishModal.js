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
import { Avatar, Fab, ListItemText } from "@mui/material";
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
export default function AddDishModal({ open, handleClick, loader }) {
  const [picstate, setpicstate] = React.useState(null);
  const [showpic, setshowpic] = React.useState(null);

  const [categories, setcategories] = React.useState([]);
  React.useEffect(() => {
    async function getData() {
      const request = await axios.get(`${HOSTURL}allcategories/`);
      setcategories(request?.data);
    }
    getData();
  }, []);
  const { control, handleSubmit, register, reset } = useForm({
    defaultValues: {
      dish_name: "",
      dish_description: "",
      dish_ingredients: "",
      price: "",
      discount: "",
      availability: false,
      featured: false,
      dish_category: [categories ? categories[0]?.name : ""],
    },
  });
  React.useEffect(() => {
    reset({
      dish_name: "",
      dish_description: "",
      dish_ingredients: "",
      availability: false,
      featured: false,
      discount: "",
      price: "",
      dish_category: [categories ? categories[0]?.name : ""],
    });
  }, [categories, reset]);
  const onSubmit = (values) => {
    let formData = new FormData();
    formData.append("dish_name", values.dish_name);
    formData.append("dish_category", JSON.stringify(values.dish_category));
    formData.append("dish_description", values.dish_description);
    formData.append("dish_ingredients", values.dish_ingredients);
    formData.append("price", values.price);
    formData.append("discount", values.discount);
    formData.append(
      "availability",
      values.availability === false ? false : true
    );
    formData.append("featured", values.featured === false ? false : true);
    if (picstate !== null) {
      formData.append("dish_picture", picstate, picstate.name);
    }
    const header = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    let url = `${HOSTURL}dishmodel/`;
    axios
      .post(url, formData, header)
      .then((res) => {
        loader();
        handleClick();
      })
      .catch((err) => {
        console.log(err);
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
                name="dish_name"
                control={control}
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    margin="normal"
                    fullWidth
                    id="dish_name"
                    label="Dish Name"
                    name="dish_name"
                    type="text"
                    inputRef={register("dish_name")}
                  />
                )}
              />
            </Box>

            <Box sx={{ my: 1 }}>
              <Controller
                name="dish_description"
                control={control}
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    margin="normal"
                    fullWidth
                    id="dish_description"
                    label="Dish Description"
                    name="dish_description"
                    type="text"
                    multiline
                    rows={4}
                    inputRef={register("dish_description")}
                  />
                )}
              />
            </Box>

            <Box sx={{ my: 1 }}>
              <Controller
                name="dish_ingredients"
                control={control}
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    margin="normal"
                    fullWidth
                    id="dish_ingredients"
                    label="Dish Ingredients"
                    name="dish_ingredients"
                    type="text"
                    multiline
                    rows={4}
                    inputRef={register("dish_ingredients")}
                  />
                )}
              />
            </Box>
            <Box sx={{ my: 3 }}>
              <Typography variant="body2">Dish Picture</Typography>
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
                    name="dish_picture"
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
                <Grid item xs={6} sm={6} sx={{ textAlign: "left" }}>
                  <Avatar
                    alt="Profile Picture"
                    src={showpic}
                    sx={{
                      width: 50,
                      height: 50,
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ my: 3 }}>
              <Controller
                control={control}
                name="dish_category"
                render={({ field }) => {
                  return (
                    <Select
                      style={{ width: "100%" }}
                      multiple
                      {...field}
                      displayEmpty={true}
                      inputRef={register("dish_category")}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value, index) => (
                            <Chip key={index} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      <MenuItem disabled>
                        <ListItemText primary="Select Category" />
                      </MenuItem>
                      {categories?.map((option) => (
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
                <Typography variant="body2">Featured</Typography>
              </Grid>
              <Grid item xs={10}>
                <Controller
                  name="featured"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      name="featured"
                      id="featured"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      {...register("featured")}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container sx={{ alignItems: "center", my: 1 }}>
              <Grid item xs={2}>
                <Typography variant="body2">Availability</Typography>
              </Grid>
              <Grid item xs={10}>
                <Controller
                  name="availability"
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} {...register("availability")}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)} />
                  )}
                />
              </Grid>
            </Grid>

            <Box sx={{ my: 1 }}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    margin="normal"
                    fullWidth
                    id="price"
                    label="Price"
                    name="price"
                    type="number"
                    inputRef={register("price")}
                  />
                )}
              />
            </Box>

            <Box sx={{ my: 1 }}>
              <Controller
                name="discount"
                control={control}
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    margin="normal"
                    fullWidth
                    id="discount"
                    label="Discount"
                    name="discount"
                    type="number"
                    inputRef={register("discount")}
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
