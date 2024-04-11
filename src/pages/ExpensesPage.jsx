import React from "react";
import { useLoaderData } from "react-router-dom";
import { deleteItem, documentTitle, fetchData } from "../Helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";

export async function expensesLoader() {
  const expenses = await fetchData("expenses");
  return { expenses };
}

export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success(`Expense deleted!`);
    } catch (e) {
      throw new Error("There was an error creating your budget");
    }
  }
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  documentTitle("Expenses | Cash Compass");
  return (
    <div className="grid-lg">
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} in total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses</p>
      )}
    </div>
  );
};

export default ExpensesPage;
