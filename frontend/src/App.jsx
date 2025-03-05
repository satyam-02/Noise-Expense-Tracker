import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Collapse,
} from "@mui/material";
import FilterBar from "./components/FilterBar";
import TotalExpense from "./components/TotalExpense"; // Import TotalExpense component

function App() {
  const [filters, setFilters] = useState({
    category: "All",
    startDate: "",
    endDate: "",
  });

  const [openExpenseModal, setOpenExpenseModal] = useState(false);
  const [categoryFilterOpen, setCategoryFilterOpen] = useState(false);
  const [totalExpenseOpen, setTotalExpenseOpen] = useState(false); // State for Total Expense

  // Toggle Category Filter (Disable Total Expense)
  const toggleCategoryFilter = () => {
    setCategoryFilterOpen(!categoryFilterOpen);
    if (!categoryFilterOpen) setTotalExpenseOpen(false); // Close Total Expense if opening Category Filter
  };

  // Toggle Total Expense View (Disable Category Filter)
  const toggleTotalExpense = () => {
    setTotalExpenseOpen(!totalExpenseOpen);
    if (!totalExpenseOpen) setCategoryFilterOpen(false); // Close Category Filter if opening Total Expense
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          margin: "20px",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={toggleCategoryFilter}
          disabled={totalExpenseOpen} // Disable if Total Expense is open
        >
          {categoryFilterOpen ? "Hide Category Filter" : "Filter by Category"}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={toggleTotalExpense}
          disabled={categoryFilterOpen} // Disable if Category Filter is open
        >
          {totalExpenseOpen ? "Hide Total Expense" : "View Total Expense"}
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenExpenseModal(true)}
        >
          Add Expense
        </Button>
      </div>

      {/* Category Filter */}
      <Collapse in={categoryFilterOpen}>
        <FilterBar filters={filters} setFilters={setFilters} filterType="category" />
      </Collapse>

      {/* Total Expense Section */}
      <Collapse in={totalExpenseOpen}>
        <TotalExpense />
      </Collapse>

      {/* Expense Table */}
      <ExpenseTable filters={filters} />

      {/* Add Expense Modal */}
      <Dialog
        open={openExpenseModal}
        onClose={() => setOpenExpenseModal(false)}
      >
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent>
          <ExpenseForm onClose={() => setOpenExpenseModal(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
