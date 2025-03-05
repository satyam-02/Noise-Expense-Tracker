import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import { Button, Dialog, DialogTitle, DialogContent, Collapse } from "@mui/material";
import FilterBar from "./components/FilterBar";

function App() {
  const [filters, setFilters] = useState({
    category: "All",
    startDate: "",
    endDate: "",
  });

  const [openExpenseModal, setOpenExpenseModal] = useState(false);
  const [categoryFilterOpen, setCategoryFilterOpen] = useState(false);
  const [dateFilterOpen, setDateFilterOpen] = useState(false);

  // Toggle Category Filter (Disable Date Filter)
  const toggleCategoryFilter = () => {
    setCategoryFilterOpen(!categoryFilterOpen);
    if (!categoryFilterOpen) setDateFilterOpen(false); // Close Date Filter
  };

  // Toggle Date Filter (Disable Category Filter)
  const toggleDateFilter = () => {
    setDateFilterOpen(!dateFilterOpen);
    if (!dateFilterOpen) setCategoryFilterOpen(false); // Close Category Filter
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "20px" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={toggleCategoryFilter}
          disabled={dateFilterOpen} // Disable when Date Filter is open
        >
          {categoryFilterOpen ? "Hide Category Filter" : "Filter by Category"}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={toggleDateFilter}
          disabled={categoryFilterOpen} // Disable when Category Filter is open
        >
          {dateFilterOpen ? "Hide Date Filter" : "Filter by Date"}
        </Button>

        <Button variant="contained" color="primary" onClick={() => setOpenExpenseModal(true)}>
          Add Expense
        </Button>
      </div>

      {/* Category Filter */}
      <Collapse in={categoryFilterOpen}>
        <FilterBar filters={filters} setFilters={setFilters} filterType="category" />
      </Collapse>

      {/* Date Range Filter */}
      <Collapse in={dateFilterOpen}>
        <FilterBar filters={filters} setFilters={setFilters} filterType="date" />
      </Collapse>

      {/* Expense Table */}
      <ExpenseTable filters={filters} />

      {/* Add Expense Modal */}
      <Dialog open={openExpenseModal} onClose={() => setOpenExpenseModal(false)}>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent>
          <ExpenseForm onClose={() => setOpenExpenseModal(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
