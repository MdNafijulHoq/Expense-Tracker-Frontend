import ExpensePieChart from "@/components/ExpensePieChart";
import { Button } from "@/components/ui/button";
import { useGetExpensesQuery } from "@/redux/features/Expense/expense.api";
import { Loader } from "lucide-react";
import { Link } from "react-router";

const HomePage = () => {
  const { data: expenses = [], isLoading } = useGetExpensesQuery(undefined);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen w-full animate-spin">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-screen">
      <div className="rounded-xl p-6 text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">
          Take Control of Your Finances
        </h3>
        <p className=" mb-4">
          Track every expense, visualize your spending patterns, and achieve
          your financial goals faster.
        </p>
        <Link to="/expenses">
          <Button>Add Your First Expense!</Button>
        </Link>
      </div>

      {/*  */}

      {/* Spending Chart Section */}
      <div className=" rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Spending by Category</h2>
        <ExpensePieChart expenses={expenses} />
      </div>

      {/* ... rest of your components ... */}
    </div>
  );
};

export default HomePage;
