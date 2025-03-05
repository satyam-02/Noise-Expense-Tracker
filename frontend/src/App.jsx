import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import { Button, Dialog, DialogTitle, DialogContent, Collapse } from "@mui/material";
import FilterBar from "./components/FilterBar";
import TotalExpense from "./components/TotalExpense";

function App() {
  const [filters, setFilters] = useState({
    category: "All",
    date: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [openExpenseModal, setOpenExpenseModal] = useState(false);
  const [categoryFilterOpen, setCategoryFilterOpen] = useState(false);
  const [totalExpenseOpen, setTotalExpenseOpen] = useState(false);

  const toggleCategoryFilter = () => {
    setCategoryFilterOpen(!categoryFilterOpen);
    if (!categoryFilterOpen) setTotalExpenseOpen(false);
  };

  const toggleTotalExpense = () => {
    setTotalExpenseOpen(!totalExpenseOpen);
    if (!totalExpenseOpen) setCategoryFilterOpen(false);
  };

  // Fetch expenses from API based on filters
  const fetchExpenses = async (appliedFilters) => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses", {
        params: {
          category: appliedFilters.category !== "All" ? appliedFilters.category : null,
          date: appliedFilters.date || null,
        },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Callback function to fetch data when filters change
  const handleFilterChange = (updatedFilters) => {
    fetchExpenses(updatedFilters);
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchExpenses(filters);
  }, []);

  return (
    <>
      <Navbar />

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "20px" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={toggleCategoryFilter}
          disabled={totalExpenseOpen}
        >
          {categoryFilterOpen ? "Hide Category Filter" : "Filter by Category"}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={toggleTotalExpense}
          disabled={categoryFilterOpen}
        >
          {totalExpenseOpen ? "Hide Total Expense" : "View Total Expense"}
        </Button>

        <Button variant="contained" color="primary" onClick={() => setOpenExpenseModal(true)}>
          Add Expense
        </Button>
      </div>

      <Collapse in={categoryFilterOpen}>
        <FilterBar filters={filters} setFilters={setFilters} onFilterChange={handleFilterChange} filterType="category" />
      </Collapse>

      <Collapse in={totalExpenseOpen}>
        <TotalExpense />
      </Collapse>

      <ExpenseTable expenses={expenses} />

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
