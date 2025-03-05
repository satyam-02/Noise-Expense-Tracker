const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.post("/expenses", expenseController.addExpense);
router.get("/expenses", expenseController.getExpenses);
router.get("/expenses/total", expenseController.getTotalExpenses);

module.exports = router;
