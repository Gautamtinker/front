// src/Component/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Header = () => {
  const navigate = useNavigate(); // Initialize navigate for programmatic navigation

  // Handle Home Button click
  const handleHomeClick = () => {
    navigate("/Dashborad"); // Navigate to Dashboard
  };

  // Handle Logout Button click
  const handleLogoutClick = () => {
    localStorage.removeItem("token"); // Clear token from localStorage
    navigate("/login"); // Navigate to Login page
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Budget Dashboard</Typography>
        <Box>
          <Button color="inherit" onClick={handleHomeClick}>
            Home
          </Button>
          <Button color="inherit" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
