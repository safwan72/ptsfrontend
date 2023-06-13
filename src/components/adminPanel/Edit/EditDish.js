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
export default function EditDish({ open, handleClick, loader,id }) {
  const [categories, setcategories] = React.useState([]);
  React.useEffect(() => {
    async function getData() {
      const request = await axios.get(`${HOSTURL}allcategories/`);
      setcategories(request?.data);
    }
    getData();
  }, []);

  const [mydish, setmydish] = React.useState({});
  React.useEffect(() => {
    async function getData() {
        if(id){
            const request = await axios.get(`${HOSTURL}dishes/${id}/`);
            setmydish(...request?.data);
        }
    }
    getData();
  }, [id]);
  console.log(mydish)
  const { control, handleSubmit, register, reset } = useForm({
    defaultValues: {
      dish_name: mydish?.dish_name?mydish?.dish_name:'',
      dish_description: mydish?.dish_description?mydish?.dish_description:'',
      dish_ingredients: mydish?.dish_ingredients?mydish?.dish_ingredients:'',
      price: mydish?.price?mydish?.price:'',
      discount: mydish?.discount?mydish?.discount:'',
      availability: Boolean(mydish?.availability?mydish?.availability:false),
      featured: Boolean(mydish?.featured?mydish?.featured:false),
      dish_category: [mydish?.dish_category ? [mydish?.dish_category[0]?.name] : ""],
    },
  });
  React.useEffect(() => {
    reset({
        dish_name: mydish?.dish_name?mydish?.dish_name:'',
        dish_description: mydish?.dish_description?mydish?.dish_description:'',
        dish_ingredients: mydish?.dish_ingredients?mydish?.dish_ingredients:'',
        price: mydish?.price?mydish?.price:'',
        discount: mydish?.discount?mydish?.discount:'',
        availability: Boolean(mydish?.availability?mydish?.availability:false),
        featured: Boolean(mydish?.featured?mydish?.featured:false),
        dish_category: [mydish?.dish_category ? [mydish?.dish_category[0]?.name] : ""],
    });
  }, [mydish, reset]);
  const onSubmit = (values) => {
    const data={
        dish_name:values.dish_name,
        dish_category:JSON.stringify(values.dish_category),
        dish_description:values.dish_description,
        dish_ingredients:values.dish_ingredients,
        price:values.price,
        discount:values.discount,
        availability:Boolean(values.availability),
        featured:Boolean(values.featured),
    }

    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let url = `${HOSTURL}updatedish/${id}/`;
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
                    onChange={(e) => field.onChange(e.target.checked)}/>
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
