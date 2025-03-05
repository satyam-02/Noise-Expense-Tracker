const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;
    if (!amount || !category || !date || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    await Expense.add(req.body);
    res.status(201).json({ message: "Expense added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding expense" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const { category, date } = req.query;
    const filters = { category, date };
    const [expenses] = await Expense.getAll(filters);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving expenses" });
  }
};

exports.getTotalExpenses = async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: "Start and End dates are required" });
    }
    const [result] = await Expense.getTotal(start, end);
    res.json({ total: result[0].total || 0 });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving total expenses" });
  }
};
