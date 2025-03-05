import React, { useState } from "react";
import { TextField, Typography, Button } from "@mui/material";
import axios from "axios";

const TotalExpense = () => {
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [totalExpense, setTotalExpense] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDates((prevDates) => ({
      ...prevDates,
      [name]: value,
    }));
  };

  const fetchTotalExpense = async () => {
    if (!dates.startDate || !dates.endDate) {
      alert("Please select both start and end dates");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/expenses/total?start=${dates.startDate}&end=${dates.endDate}`
      );
      setTotalExpense(response.data.total);
    } catch (error) {
      console.error("Error fetching total expenses:", error);
      setTotalExpense("Error fetching data");
    }
    setLoading(false);
  };

  return (
    <div>
      <TextField
        label="Start Date"
        name="startDate"
        type="date"
        value={dates.startDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
      <TextField
        label="End Date"
        name="endDate"
        type="date"
        value={dates.endDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        style={{ marginTop: "10px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={fetchTotalExpense}
        disabled={loading}
        style={{ marginTop: "15px" }}
      >
        {loading ? "Fetching..." : "Calculate"}
      </Button>
      {totalExpense !== null && (
        <Typography variant="h6" color="black" style={{ marginTop: "15px" }}>
          Total Expense: ₹{totalExpense}
        </Typography>
      )}
    </div>
  );
};

export default TotalExpense;
