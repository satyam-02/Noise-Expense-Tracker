import { useState, useEffect } from "react";
import axios from "axios";
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
  Box,
  Paper,
} from "@mui/material";
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

  const fetchExpenses = async (appliedFilters) => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses", {
        params: {
          category:
            appliedFilters.category !== "All" ? appliedFilters.category : null,
          date: appliedFilters.date || null,
        },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleFilterChange = (updatedFilters) => {
    fetchExpenses(updatedFilters);
  };

  useEffect(() => {
    fetchExpenses(filters);
  }, []);

  return (
    <>
      <Navbar />

      <Paper
        elevation={4}
        sx={{
          maxWidth: 800,
          mx: "auto",
          mt: 4,
          p: 3,
          border: "2px solid #ccc",
          borderRadius: 4,
          boxShadow: 3,
          backgroundColor: "#fafafa",
        }}
      >
        {/* Button Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleCategoryFilter}
            disabled={totalExpenseOpen}
            sx={{ borderRadius: 2, px: 3, py: 1 }}
          >
            {categoryFilterOpen ? "Hide Category Filter" : "Filter by Category"}
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={toggleTotalExpense}
            disabled={categoryFilterOpen}
            sx={{ borderRadius: 2, px: 3, py: 1 }}
          >
            {totalExpenseOpen ? "Hide Total Expense" : "View Total Expense"}
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenExpenseModal(true)}
            sx={{ borderRadius: 2, px: 3, py: 1 }}
          >
            Add Expense
          </Button>
        </Box>

        {/* Filter Bar */}
        <Collapse in={categoryFilterOpen}>
          <Paper
            elevation={3}
            sx={{ p: 2, mt: 3, maxWidth: 600, mx: "auto", borderRadius: 2 }}
          >
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              onFilterChange={handleFilterChange}
              filterType="category"
            />
          </Paper>
        </Collapse>

        {/* Total Expense Section */}
        <Collapse in={totalExpenseOpen}>
          <Paper
            elevation={3}
            sx={{ p: 2, mt: 3, maxWidth: 600, mx: "auto", borderRadius: 2 }}
          >
            <TotalExpense />
          </Paper>
        </Collapse>

        {/* Expense Table */}
        <Box sx={{ mt: 4 }}>
          <ExpenseTable expenses={expenses} />
        </Box>
      </Paper>

      {/* Add Expense Modal */}
      <Dialog
        open={openExpenseModal}
        onClose={() => setOpenExpenseModal(false)}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 3,
            boxShadow: 5,
            p: 3,
            maxWidth: 500,
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
            pb: 1,
          }}
        >
          Add Expense
        </DialogTitle>

        <DialogContent>
          <ExpenseForm onClose={() => setOpenExpenseModal(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
