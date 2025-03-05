import React, { useState, useEffect } from "react";
import { TextField, Typography, Card, CardContent } from "@mui/material";

const TotalExpense = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalExpense, setTotalExpense] = useState(null);

  // Function to fetch total expense for the selected date range
  const fetchTotalExpense = async () => {
    if (!startDate || !endDate) return;

    try {
      const response = await fetch(
        `https://your-api.com/total-expense?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();
      setTotalExpense(data.totalExpense);
    } catch (error) {
      console.error("Error fetching total expense:", error);
      setTotalExpense(null);
    }
  };

  // Fetch total expense when startDate or endDate changes
  useEffect(() => {
    fetchTotalExpense();
  }, [startDate, endDate]);

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h6" align="center">
          Select Date Range
        </Typography>

        {/* Start Date Input */}
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ mt: 2 }}
        />

        {/* End Date Input */}
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ mt: 2 }}
        />

        {/* Display Total Expense */}
        {totalExpense !== null && (
          <Typography variant="h5" align="center" color="primary" sx={{ mt: 2 }}>
            Total Expense: ₹{totalExpense.toFixed(2)}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TotalExpense;
