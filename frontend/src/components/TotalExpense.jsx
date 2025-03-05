import React, { useState, useEffect } from "react";
import { TextField, Typography } from "@mui/material";
import axios from "axios";

const TotalExpense = () => {
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [totalExpense, setTotalExpense] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDates((prevDates) => ({
      ...prevDates,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchTotalExpense = async () => {
      if (dates.startDate && dates.endDate) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/expenses/total?start=${dates.startDate}&end=${dates.endDate}`
          );
          setTotalExpense(response.data.total);
        } catch (error) {
          console.error("Error fetching total expenses:", error);
          setTotalExpense("Error fetching data");
        }
      }
    };

    fetchTotalExpense();
  }, [dates.startDate, dates.endDate]); // Trigger API call when both dates are set

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
      {totalExpense !== null && (
        <Typography variant="h6" style={{ marginTop: "15px" }}>
          Total Expense: ₹{totalExpense}
        </Typography>
      )}
    </div>
  );
};

export default TotalExpense;
