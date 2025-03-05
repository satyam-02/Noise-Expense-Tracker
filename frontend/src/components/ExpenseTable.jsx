import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const ExpenseTable = ({ expenses }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell>{expense.date}</TableCell>
            <TableCell>{expense.category}</TableCell>
            <TableCell>₹{expense.amount}</TableCell>
            <TableCell>{expense.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExpenseTable;
