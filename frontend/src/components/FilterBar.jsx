import React from "react";
import { TextField, MenuItem, Container } from "@mui/material";

const categories = ["All", "Food", "Transport", "Shopping", "Entertainment"];

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Container sx={{ mt: 4, display: "flex", gap: 2 }}>
      <TextField
        select
        label="Category"
        name="category"
        value={filters.category}
        onChange={handleChange}
        fullWidth
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Date"
        name="date"
        type="date"
        value={filters.date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
    </Container>
  );
};

export default FilterBar;
