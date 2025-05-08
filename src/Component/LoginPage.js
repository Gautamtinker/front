import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  AccountCircle,
  LockRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { loginUser } from "../services/api";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Import useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Use the loginUser function from api.js
      const response = await loginUser({ email, password });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      console.log("Login successful:", response.data);

      // Navigate to Dashboard after successful login
      navigate("/Dashborad");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed.");
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onRegister = () => {
    navigate("/");
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3f51b5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0px 3px 5px rgba(0,0,0,0.2)",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 2, color: "#3f51b5" }}
        >
          Login
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 1 }}>
            {error}
          </Typography>
        )}
        <Box
          component="form"
          onSubmit={handleLogin}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRounded color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#4caf50",
              "&:hover": { backgroundColor: "#388e3c" },
            }}
          >
            Login
          </Button>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            onClick={onRegister}
          >
            New User
            {/* <Link href="#" onClick={onLogin} variant="body2" color="primary">
                        Login
                      </Link> */}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
