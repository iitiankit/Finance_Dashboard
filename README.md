# Finance Dashboard

A simple and interactive finance dashboard built using React.
It helps users track their income, expenses, and overall financial activity in a clean and intuitive way.

---

## Overview

This project focuses on building a frontend-only dashboard that allows users to:

* View a summary of their finances
* Explore transactions
* Analyze spending patterns
* Switch between different roles (Viewer / Admin)

All data is handled on the client side using local storage.

---

## Features

### 1. Dashboard Overview

The main dashboard gives a quick summary of financial data.

* Total Balance (Income - Expenses)
* Total Income
* Total Expenses
* Savings and total transactions count

It also includes visual charts to make data easier to understand.

---

### 2. Charts and Visualization

Two types of charts are used:

* **Bar Chart** → shows income vs expense over time
* **Pie Chart** → shows category-wise spending

These help in quickly identifying trends and major spending areas.

---

### 3. Transactions Section

Users can view all transactions in a list format.

Each transaction includes:

* Category
* Date
* Amount
* Type (Income / Expense)

#### Functionalities:

* Search by category
* Filter by:

  * Date
  * Type (income/expense)
  * Amount
* Scrollable transaction list

---

### 4. Add Transaction (Admin Only)

When switched to Admin role:

* A form appears to add new transactions
* Fields:

  * Amount
  * Category
  * Date
  * Type

New transactions are instantly added and reflected across:

* Dashboard
* Charts
* Insights

---

### 5. Role-Based UI

A simple role system is implemented:

* **Viewer** → Can only see data
* **Admin** → Can add new transactions

Role can be switched using a dropdown.

---

### 6. Insights Section

Provides useful observations based on transaction data:

* Highest spending category
* Monthly comparison
* Income vs Expense trends
* Additional stats like savings and averages

---

### 7. Dark Mode

A toggle is provided to switch between:

* Light mode
* Dark mode

The entire UI adjusts accordingly, including:

* Backgrounds
* Text
* Inputs

---

### 8. Data Persistence

All transactions are stored in **localStorage**.

This ensures:

* Data is not lost on refresh
* User experience remains consistent

---

### 9. Responsive Design

The layout works across different screen sizes:

* Sidebar becomes a hamburger menu on mobile
* Charts and cards adjust based on screen width
* Smooth navigation on small devices

---

## Tech Stack

* React (Vite)
* Tailwind CSS
* Recharts (for charts)
* LocalStorage (for persistence)

---

## Project Structure

```
src/
 ├── components/
 │    ├── Dashboard/
 │    ├── Transactions/
 │    ├── Insights/
 │    └── shared/
 │
 ├── pages/
 │    └── Home.jsx
 │
 ├── data/
 │    └── data.js
```

---

## How to Run

```bash
npm install
npm run dev
```

---

## Notes

* This is a frontend-only project
* No backend or authentication is implemented
* Data is mocked and stored locally

---

## What I Focused On

* Clean UI and layout
* Simple and intuitive interactions
* Reusable components
* Proper state handling
* Real-time updates across sections

---

## Future Improvements

* Edit / delete transactions
* Export data (CSV / JSON)
* Better analytics and charts
* Backend integration

---

## Conclusion

This project demonstrates how a financial dashboard can be built with a focus on usability, clarity, and clean frontend architecture.

---
