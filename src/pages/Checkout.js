import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import AddressForm from "../components/Checkout/AddressForm";
import Review from "../components/Checkout/Review";
import HOC from "./HOC";
import { useDispatch } from "react-redux";
import * as actions from "../app/actioncreator";
import Confirmation from "../components/Checkout/Confirmation";
const steps = ["Shipping address", "Review your order"];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm handleNext={handleNext} />;
      case 1:
        return <Review handleNext={handleNext} />;
      case 2:
        return <Confirmation />;
      default:
        throw new Error("Unknown step");
    }
  }

  React.useEffect(() => {
    async function getData() {
      dispatch(actions.cart(false));
    }
    getData();
  }, [dispatch]);
  return (
    <HOC>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
        </Paper>
      </Container>
    </HOC>
  );
}
