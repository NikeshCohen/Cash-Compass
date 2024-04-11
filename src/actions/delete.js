import { deleteItem, getAllMatchingItems } from "../Helpers";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export function deleteBudget({ params }) {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((element) => {
      deleteItem({
        key: "expenses",
        id: element.id,
      });
    });

    toast.success("Budget deleted");
  } catch (error) {
    console.error(error);
    throw new Error("Unable to delete budget");
  }

  return redirect("/");
}
