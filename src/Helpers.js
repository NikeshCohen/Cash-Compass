export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 24;
  return `${existingBudgetLength * 24} 65% 50%`;
};

// Local Storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];

  return data.filter((item) => item[key] === value);
};

export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };

  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };

  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);

  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }

  return localStorage.removeItem(key);
};

export const calculateSpentByBudget = (budgetId) => {
  console.log(budgetId);
  const expenses = fetchData("expenses") ?? [];
  console.log(expenses);
  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;
    console.log(expense);
    return (acc += expense.amount);
  }, 0);

  return budgetSpent;
};

export const formateDateToLocalString = (date) => {
  const formattedDate = new Date(date).toLocaleDateString();
  return formattedDate;
};

export const formatPercentage = (amount) => {
  return amount.toLocaleString("US", {
    style: "percent",
    miniumFractionDigits: 0,
  });
};

export const formatCurrency = (amount) => {
  // console.log(`Amount from formatecurrnecy ${amount}`);

  const formattedAmount = amount
    .toLocaleString("US", {
      style: "currency",
      currency: "USD",
    })
    .replace("$", "R");

  return formattedAmount;
};

export const documentTitle = (newTitle) => {
  return (document.title = newTitle);
};
