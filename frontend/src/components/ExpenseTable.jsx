import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";

const ExpenseTable = ({ expenses }) => {
  return (
    <div
      style={{
        boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        overflow: "hidden",
        margin: "20px auto",
        maxWidth: "800px",
        backgroundColor: "white",
      }}
    >
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#f4f4f4" }}>
            <TableCell>
              <strong>Date</strong>
            </TableCell>
            <TableCell>
              <strong>Category</strong>
            </TableCell>
            <TableCell>
              <strong>Amount</strong>
            </TableCell>
            <TableCell>
              <strong>Description</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="h6" color="textSecondary">
                  No results found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((expense) => (
              <TableRow key={expense.id}>
               <TableCell>{new Date(expense.date).toISOString().split("T")[0]}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>₹{expense.amount}</TableCell>
                <TableCell>{expense.description}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseTable;
