import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import { Button, Dialog, DialogTitle, DialogContent, Collapse } from "@mui/material";
import FilterBar from "./components/FilterBar";

function App() {
  const [filters, setFilters] = useState({ category: "All", date: "" });
  const [openExpenseModal, setOpenExpenseModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <Navbar />

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "20px" }}>
        <Button variant="contained" color="secondary" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
        <Button variant="contained" color="primary" onClick={() => setOpenExpenseModal(true)}>
          Add Expense
        </Button>
      </div>

      {/* Collapsible Filter Bar */}
      <Collapse in={showFilters}>
        <FilterBar filters={filters} setFilters={setFilters} />
      </Collapse>

      {/* Expense Table - Fetches data internally */}
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
