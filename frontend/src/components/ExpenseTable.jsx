import React, { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, TablePagination } from "@mui/material";

const ExpenseTable = ({ expenses }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
            expenses
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Paginate data
              .map((expense) => (
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={expenses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ExpenseTable;
