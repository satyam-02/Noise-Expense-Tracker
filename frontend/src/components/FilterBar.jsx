import React from "react";
import { TextField, MenuItem, Container, Button } from "@mui/material";

const categories = ["All", "Food", "Transport", "Shopping", "Entertainment"];

const FilterBar = ({ filters, setFilters, onFilterChange, filterType }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = {
      ...filters,
      [name]: value || null,
    };

    setFilters(updatedFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = { category: "", date: "" };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters); // Clear filters in parent component
  };

  const handleApplyFilters = () => {
    onFilterChange(filters); // Trigger API call with selected filters
  };

  return (
    <Container sx={{ mt: 4, display: "flex", gap: 2, alignItems: "center" }}>
      {filterType === "category" && (
        <>
          <TextField
            select
            label="Category"
            name="category"
            value={filters.category ?? ""}
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
            value={filters.date ?? ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <Button variant="outlined" color="secondary" onClick={handleApplyFilters}>
            Filter
          </Button>

          <Button variant="outlined" color="secondary" onClick={handleClearFilters}>
            Clear
          </Button>
        </>
      )}
    </Container>
  );
};

export default FilterBar;
