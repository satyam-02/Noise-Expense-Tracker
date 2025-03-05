const db = require("../config");

class Expense {
  static async add(expense) {
    const { amount, category, date, description } = expense;

    const formattedDate = new Date(date).toISOString().substring(0, 10);

    return db.execute(
      "INSERT INTO expenses (amount, category, date, description) VALUES (?, ?, ?, ?)",
      [amount, category, formattedDate, description]
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
        const adjustedDate = new Date(filters.date);
        adjustedDate.setDate(adjustedDate.getDate() + 1);
        const formattedDate = adjustedDate.toISOString().split("T")[0]; 

        query += " AND date = ?";
        params.push(formattedDate);
    }

    return db.execute(query, params);
}


static async getTotal(start, end) {
  const startDate = new Date(start);
  startDate.setDate(startDate.getDate() + 1);
  return db.execute(
    "SELECT SUM(amount) AS total FROM expenses WHERE date BETWEEN ? AND ?",
    [startDate.toISOString().split("T")[0], end]
  );
}

}

module.exports = Expense;
