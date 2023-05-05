import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import espark from "../Home/logo.svg";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  add,
  addIfDoesntExists,
  get,
} from "../../Services/localstorage.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
const Login = () => {
  const initalState = {
    id: new Date().getTime(),
    email: "",
    password: "",
    repassword: "",
  };
  addIfDoesntExists();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initalState);
  const [errors, setErrors] = useState({});
  const [signUp, setSignUp] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const generateString = () => {
    const randomString = Math.random().toString(36).substring(2, 18);
    return randomString;
  };
  const handleSubmit = (e) => {
    let errorObj = {};
    e.preventDefault();
    if (signUp) {
      Object.keys(formData).forEach((data) => {
        if (formData[data] === "") {
          errorObj[data] = "This field is required";
        }
      });
      setErrors(errorObj);
      if (formData.password !== formData.repassword) {
        setErrors((prev) => ({
          ...prev,
          repassword: "This password does not match with the previous one",
        }));
        return;
      }
      if (Object.keys(errorObj).length === 0) {
        add("credentials", formData);
        toast("User has been added, try logging in!");
        setSignUp(false);
        e.target.reset();
        e.target.email.focus();
      }
    } else {
      Object.keys(formData).forEach((data) => {
        if (formData[data] === "" && data !== "repassword") {
          errorObj[data] = "This field is required";
        }
      });
      setErrors(errorObj);
      if (Object.keys(errorObj).length === 0) {
        let dataFromLS = get("credentials");
        if (dataFromLS == null) {
          toast.error("No accounts created!");
          return;
        }
        const user = dataFromLS.find((data) => data.email === formData.email);
        if (user) {
          if (
            formData.email === user.email &&
            formData.password === user.password
          ) {
            localStorage.setItem(
              "token",
              JSON.stringify({ token: generateString(), email: formData.email })
            );
            navigate("/show");
          }
        } else {
          toast.error("You have entered wrong credentials");
        }
      }
    }
  };

  const handleState = () => {
    setSignUp((prev) => !prev);
    setErrors({});
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
              error={errors.email && true}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address or Username"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              helperText={errors.email && errors.email}
              // helperText="Enter Please"
              autoFocus
            />
            <TextField
              error={errors.password && true}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              helperText={errors.password && errors.password}
              autoComplete="current-password"
            />
            {signUp && (
              <TextField
                error={errors.repassword && true}
                margin="normal"
                required
                fullWidth
                name="repassword"
                label="Retype Password"
                type="password"
                id="re-password"
                onChange={handleChange}
                autoComplete="current-password"
                value={formData.repassword}
                helperText={errors.repassword && errors.repassword}
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
              <Grid item>
                <Button href="#" variant="body2" onClick={handleState}>
                  {!signUp
                    ? "Don't have an account? Sign Up"
                    : "Already have an account Login"}
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
