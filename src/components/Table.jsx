import React from "react";
import ExpenseItem from "./ExpenseItem";

const Table = ({ expenses, showBudget = true }) => {
  return (
    <table>
      <thead>
        <tr>
          {["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map(
            (heading, index) => (
              <th key={index}>{heading}</th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <ExpenseItem expense={expense} showBudget={showBudget} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
