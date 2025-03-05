import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Toolbar>
        <Typography variant="h6">Expense Tracker</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
