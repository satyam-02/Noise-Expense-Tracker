import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, MenuItem, Container } from "@mui/material";

const categories = ["Food", "Transport", "Shopping", "Entertainment"];

const ExpenseForm = ({ onClose }) => {
  const [expense, setExpense] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const isFormValid = Object.values(expense).every((field) => field.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);
    setError("");

    try {

      const adjustedDate = new Date(expense.date);
      adjustedDate.setDate(adjustedDate.getDate() + 1); 
      const formattedDate = adjustedDate.toISOString().split("T")[0];
      await axios.post("http://localhost:5000/api/expenses", {
        ...expense,
        date: formattedDate, 
      });
      onClose();
      window.location.reload();
    } catch (err) {
      setError("Failed to add expense. Please try again.");
    } finally {
      setLoading(false);
      setExpense({ amount: "", category: "", date: "", description: "" });
    }
};


  return (
    <Container sx={{ mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={expense.amount}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          select
          label="Category"
          name="category"
          value={expense.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
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
          value={expense.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Description"
          name="description"
          value={expense.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading || !isFormValid}
        >
          {loading ? "Adding..." : "Submit"}
        </Button>
      </form>
    </Container>
  );
};

export default ExpenseForm;
