import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Container } from "@mui/material";
import axios from "axios";

const categories = ["All", "Food", "Transport", "Shopping", "Entertainment"];

const FilterBar = ({ filters, setFilters, filterType }) => {
  const [showDateRange, setShowDateRange] = useState(false);

  useEffect(() => {
    setShowDateRange(filterType === "date");
  }, [filterType]);

  // Function to fetch expenses from the backend
  const fetchExpenses = async () => {
    try {
      if (filterType === "category" && (filters.category || filters.date)) {
        const response = await axios.get("http://localhost:5000/api/expenses", {
          params: {
            category: filters.category ?? null,
            date: filters.date ?? null,
          },
        });
        console.log("Fetched Expenses:", response.data);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Call API when category or date is selected
  useEffect(() => {
    if (filterType === "category") {
      fetchExpenses();
    }
  }, [filters.category, filters.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value || null, // If empty, set to null
    }));
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

          {/* Single Date Picker for Category Filter */}
          <TextField
            label="Date"
            name="date"
            type="date"
            value={filters.date ?? ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </>
      )}

      {/* Date Range Filter (Not triggering API call) */}
      {showDateRange && filterType === "date" && (
        <>
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={filters.startDate ?? ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            value={filters.endDate ?? ""}
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
