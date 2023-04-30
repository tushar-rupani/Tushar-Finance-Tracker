import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import espark from "../Home/logo.svg";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { add } from "../../Services/localstorage.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();
const Login = () => {
  const initalState = {
    email: "",
    password: "",
    repassword: ""
  };
  const [formData, setFormData] = useState(initalState);
  const [errors, setErrors] = useState({});
  const [signUp, setSignUp] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(signUp){
      if(formData.password !== formData.repassword){
        setErrors((prev) => ({...prev, repassword: "This password does not match with the previous one"}));
        return
      }
      
      add("credentials", formData);
      toast("User has been added, try logging in!")
      setSignUp(false)
      e.target.reset();
      e.target.email.focus()
    }
  };

  const handleState = () => {
    setSignUp((prev) => !prev);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={espark} alt="Company Logo" />
          <br />
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          {signUp ? "Sign Up" : "Sign In"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
            // error
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              // helperText="Enter Please"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              autoComplete="current-password"
            />
            {signUp && (
              <TextField
                error = {errors.repassword && true}
                margin="normal"
                required
                fullWidth
                name="repassword"
                label="Retype Password"
                type="password"
                id="re-password"
                onChange={handleChange}
                autoComplete="current-password"
                helperText = {errors.repassword && errors.repassword}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {signUp ? "Sign UP" : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xl>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Button href="#" variant="body2" onClick={handleState}>
                  {!signUp ? "Don't have an account? Sign Up" : "Already have an account Login"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default Login;
