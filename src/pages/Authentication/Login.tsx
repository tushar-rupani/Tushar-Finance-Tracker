import React, { ChangeEvent, FormEvent, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { addUser } from "../../reducers/users";

const theme = createTheme();
const Login = () => {
  const dispatch = useDispatch();
  interface ErrorType {
    email: string;
    password: string;
    repassword: string;
  }

  interface UserFormType {
    id: number;
    email: string;
    password: string;
    repassword: string;
  }
  const initalState: UserFormType = {
    id: new Date().getTime(),
    email: "",
    password: "",
    repassword: "",
  };
  const InitialError = { email: "", password: "", repassword: "" };

  const users = useSelector((state: RootState) => state.users.value);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initalState);
  const [errors, setErrors] = useState<ErrorType>(InitialError);
  const [signUp, setSignUp] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const generateString = () => {
    const randomString = Math.random().toString(36).substring(2, 18);
    return randomString;
  };

  const handleSubmit = (e: FormEvent) => {
    console.log("coming");

    let errorObj: ErrorType = InitialError;
    e.preventDefault();
    if (signUp) {
      Object.keys(formData).forEach((data) => {
        if (formData[data as keyof UserFormType] === "") {
          errorObj[data as keyof ErrorType] = "This field is required";
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

      const isEmpty = Object.values(errorObj).every((value) => value === "");
      console.log(isEmpty);

      if (isEmpty) {
        dispatch(addUser(formData));
        setSignUp(false);
      }
    } else {
      const isEmpty = Object.values(errorObj).every((value) => value === "");
      Object.keys(formData).forEach((data) => {
        if (
          formData[data as keyof UserFormType] === "" &&
          data !== "repassword"
        ) {
          errorObj[data as keyof ErrorType] = "This field is required";
        }
      });
      setErrors(errorObj);
      if (isEmpty) {
        const user = users.find((user) => user.email === formData.email);
        if (user) {
          if (
            formData.email === user.email &&
            formData.password === user.password
          ) {
            const objToSetCookie = {
              email: formData.email,
              token: generateString(),
            };
            const expDate = new Date(new Date().getTime() + 3600 * 1000);
            document.cookie = `finance-tracker=${JSON.stringify(
              objToSetCookie
            )};expires=${expDate.toUTCString()}`;
            navigate("/");
          }
        } else {
          alert("You have entered wrong credentials");
        }
      }
    }
  };

  const handleState = () => {
    setSignUp((prev) => !prev);
    setErrors(InitialError);
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
              error={!!errors.email}
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
              error={!!errors.password}
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
                error={!!errors.repassword}
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
                <Button href="#" onClick={handleState}>
                  {!signUp
                    ? "Don't have an account? Sign Up"
                    : "Already have an account Login"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
