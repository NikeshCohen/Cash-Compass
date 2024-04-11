import React from "react";
import {
  formatCurrency,
  formateDateToLocalString,
  getAllMatchingItems,
} from "../Helpers";
import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";

const ExpenseItem = ({ expense, showBudget = true }) => {
  const fetcher = useFetcher();
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formateDateToLocalString(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link
            to={`/budget/${expense.budgetId}`}
            style={{ "--accent": budget.color }}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" value="deleteExpense" name="_action" />
          <input type="hidden" value={expense.id} name="expenseId" />
          <button type="submit" className="btn btn--warning">
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
