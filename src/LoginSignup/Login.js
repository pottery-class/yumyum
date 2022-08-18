import React, { useState, useRef } from "react";
import { StyledPaper } from "./Styles";
import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import { useAuth } from "../Context/Context";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      //after logging in, move to the dashboard
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Failed to create login");
    }

    setLoading(false);
  };

  return (
    <Grid>
      <StyledPaper elevation={10}>
        <Grid align="center">
          <Typography variant="h3">Log In here</Typography>
        </Grid>

        {error && <Alert severity="error">{error}</Alert>}

        <Grid>
          <form onSubmit={handleSignUpSubmit}>
            <Typography variant="subtitle1">Email</Typography>
            <TextField fullWidth type="email" inputRef={emailRef} />
            <Typography variant="subtitle1">Password</Typography>
            <TextField
              fullWidth
              type="password"
              inputRef={passwordRef}
              autoComplete="on"
            />

            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              color={{ loading } ? "primary" : "secondary"}
            >
              Log In
            </Button>
          </form>

          <Typography variant="subtitle1">
            No existing account? <br></br>{" "}
            <Link to="/signup"> Create Account Now </Link>
          </Typography>
        </Grid>
      </StyledPaper>
    </Grid>
  );
};

export default Login;
