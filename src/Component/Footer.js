// src/Component/Footer.js
import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 4, py: 2, backgroundColor: "#f5f5f5" }}>
      <Typography variant="body2">
        © 2025 Budget Tracker Inc. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
