import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Container } from "@mui/material";

const categories = ["All", "Food", "Transport", "Shopping", "Entertainment"];

const FilterBar = ({ filters, setFilters, filterType }) => {
  const [showDateRange, setShowDateRange] = useState(false);

  useEffect(() => {
    if (filterType === "date") {
      setShowDateRange(true);
    } else {
      setShowDateRange(false);
    }
  }, [filterType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <Container sx={{ mt: 4, display: "flex", gap: 2 }}>
      {/* Category Filter */}
      {filterType === "category" && (
        <>
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

          {/* Single Date Picker for Category Filter */}
          <TextField
            label="Date"
            name="date"
            type="date"
            value={filters.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </>
      )}

      {/* Date Range Filter */}
      {showDateRange && filterType === "date" && (
        <>
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={filters.startDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            value={filters.endDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </>
      )}
    </Container>
  );
};

export default FilterBar;
