const db = require("../config");

class Expense {
  static async add(expense) {
    const { amount, category, date, description } = expense;
    return db.execute(
      "INSERT INTO expenses (amount, category, date, description) VALUES (?, ?, ?, ?)",
      [amount, category, date, description]
    );
  }

  static async getAll(filters) {
    let query = "SELECT * FROM expenses WHERE 1=1";
    let params = [];

    if (filters.category) {
      query += " AND category = ?";
      params.push(filters.category);
    }

    if (filters.date) {
      query += " AND date = ?";
      params.push(filters.date);
    }

    return db.execute(query, params);
  }

  static async getTotal(start, end) {
    return db.execute(
      "SELECT SUM(amount) AS total FROM expenses WHERE date BETWEEN ? AND ?",
      [start, end]
    );
  }
}

module.exports = Expense;
