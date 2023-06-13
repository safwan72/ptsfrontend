import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import { styled} from "@mui/material/styles";
import axios from "axios";
import { HOSTURL } from "../../../utils/hostURL";



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
export default function AddCustomer({ open, handleClick,loader,admin }) {
  const { control, handleSubmit, register, reset } = useForm({
    defaultValues: {
      username: "",
      email: "",
      full_name: "",
      address: "",
      phone: "",
    },
  });
  React.useEffect(() => {
    reset({
        username: "",
        email: "",
        full_name: "",
        address: "",
        phone: "",
    });
  }, [reset]);
  const onSubmit = (values) => {
    console.log(values)
    const data={
        username:values.username,
        email:values.email,
        full_name:values.full_name,
        address:values.address,
        phone:values.phone,
    }
//                   // http://127.0.0.1:8000/api/main/dishmodel/
const header = {
headers: {
"Content-Type": "application/json",
},
};
let url = `${HOSTURL}newcustomer/`

              axios.post(url, data,header)
            .then(res => {
              loader();
              handleClick();
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
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ my: 1 }}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    inputRef={register("email")}
                  />
                )}
              />
            </Box>
            <Box sx={{ my: 1 }}>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    margin="normal"
                    fullWidth
                    id="username"
                    label="UserName"
                    name="username"
                    type="text"
                    inputRef={register("username")}
                  />
                )}
              />
            </Box>
            <Box sx={{ my: 1 }}>
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
            </Box>

            <Box sx={{ my: 1 }}>
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
                    multiline
                    rows={4}
                    inputRef={register("address")}
                  />
                )}
              />
            </Box>


            <Box sx={{ my: 1 }}>
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
            </Box>
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
