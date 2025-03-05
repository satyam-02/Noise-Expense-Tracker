import React, { useState } from "react";
import { TextField, Button, MenuItem, Container } from "@mui/material";

const categories = ["Food", "Transport", "Shopping", "Entertainment"];

const ExpenseForm = ({ addExpense }) => {
  const [expense, setExpense] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(expense);
    setExpense({ amount: "", category: "", date: "", description: "" });
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
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Add Expense
        </Button>
      </form>
    </Container>
  );
};

export default ExpenseForm;
