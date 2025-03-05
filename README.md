# Expense Tracker

A simple Expense Tracker application that allows users to add, view, filter, and calculate total expenses.

## Video demo
https://drive.google.com/file/d/1xu6Jikom9qOHG3765-4xL77u2uEcVu2-/view?usp=sharing

## 🚀 Features
- Add expenses with details (amount, category, date, and description).
- View a list of recorded expenses.
- Filter expenses by date and category.
- View the total expenses for a given period.

## 🛠 Tech Stack
- **Backend:** Node.js with Express (using MongoDB/MySQL for storage).
- **Frontend:** React.js

## 📌 API Endpoints

### Expenses
- `POST /expenses` → Add a new expense.
- `GET /expenses` → Retrieve all expenses.
- `GET /expenses?category=Food&date=YYYY-MM-DD` → Filter expenses.
- `GET /expenses/total?start=YYYY-MM-DD&end=YYYY-MM-DD` → Get total expenses for a date range.

## 📦 Installation & Setup

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/satyam-02/expense-tracker.git
   cd expense-tracker/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in `.env`:
   ```env
   PORT=5000
    DB_HOST=sql12.freesqldatabase.com
    DB_USER=sql12765941
    DB_PASS=EzLMArlLXm
    DB_NAME=sql12765941
   ```
4. Start the backend server:
   ```sh
   node server.js
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm run dev
   ```

## 🚀 Running the Project
Ensure both backend and frontend are running:
```sh
# Start backend
cd backend &&  node server.js

# Start frontend (in a new terminal)
cd frontend && npm run dev
```

## 🎯 Usage
- Open `http://localhost:5173` to access the frontend.
- The backend runs on `http://localhost:5000`.

## 🤝 Contributing
Feel free to fork the project, create a feature branch, and submit a pull request!

---
Made with ❤️ by [Satyam]

