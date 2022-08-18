import React, { useState, useRef } from "react";
import { StyledPaper } from "./Styles";
import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import { useAuth } from "../Context/Context";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { signup } = useAuth();
  const newEmailRef = useRef();
  const newPasswordRef = useRef();
  const passwordCfmRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (newPasswordRef.current.value !== passwordCfmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(newEmailRef.current.value, newPasswordRef.current.value);
      //after creating account, move to dashboard
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  };

  return (
    <Grid>
      <StyledPaper elevation={10}>
        <Grid align="center">
          <Typography variant="h3">Sign In here</Typography>
        </Grid>

        {!error && loading && (
          <Alert severity="success">Creation Success!</Alert>
        )}
        {error && <Alert severity="error">{error}</Alert>}

        <Grid>
          <form onSubmit={handleSignUpSubmit}>
            <Typography variant="subtitle1">Email</Typography>
            <TextField fullWidth type="email" inputRef={newEmailRef} />
            <Typography variant="subtitle1">Password</Typography>
            <TextField
              fullWidth
              type="password"
              inputRef={newPasswordRef}
              autoComplete="on"
            />
            <Typography variant="subtitle1">Password Confirmation</Typography>
            <TextField
              fullWidth
              type="password"
              inputRef={passwordCfmRef}
              autoComplete="on"
            />

            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              color={{ loading } ? "primary" : "secondary"}
            >
              Create New Account
            </Button>
          </form>

          <Typography variant="subtitle1">
            Already have an account? <Link to="/login"> Log in </Link>
          </Typography>
        </Grid>
      </StyledPaper>
    </Grid>
  );
};

export default SignUp;
