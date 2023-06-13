import React from "react";
import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { HOSTURL } from "../../utils/hostURL";

const CssTextField = styled(TextField)({
  "& input": {
    color: "black",
  },
  "& label.Mui-focused": {
    color: "black",
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

const Feedback = () => {
  const notify = (message) => toast(message);

  const onSubmit = (values, e) => {
    // addfeedback
    const data = {
      phone: values.phone,
      email: values.email,
      message: values.message,
    };
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(`${HOSTURL}addfeedback/`, data, header)
      .then((response) => {
        if (response?.data?.response === true) {
          notify("FeedBack Submitted Successfully");
          e.target.reset();
        }
      })
      .catch((error) => {
        notify("Something Went Wrong. Try Again Please.");
      });

    console.log(values);
  };

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      phone: "",
      email: "",
      message: "",
    },
  });
  React.useEffect(() => {
    if (!isSubmitSuccessful) {
      return;
    }

    reset({
      phone: "",
      email: "",
      message: "",
    });
  }, [isSubmitSuccessful, reset]);
  return (
    <Box sx={{ my: 5, mt: 20 }}>
      <Toaster
        position="top-right"
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#FBBF24",
            color: "#fff",
          },
        }}
      />
      <Typography variant="h5" sx={{ my: 4, textAlign: "center" }}>
        Submit Your Feedback
      </Typography>

      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <CssTextField
                {...field}
                margin="normal"
                fullWidth
                required
                id="email"
                label="Email"
                name="email"
                type="email"
                inputRef={register("email")}
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
            name="message"
            control={control}
            render={({ field }) => (
              <CssTextField
                {...field}
                id="message"
                multiline
                rows={8}
                margin="normal"
                fullWidth
                label="Your Feedback"
                name="message"
                type="text"
                inputRef={register("message")}
              />
            )}
          />
          <ColorButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Feedback
          </ColorButton>
        </form>
      </Box>
    </Box>
  );
};

export default Feedback;
