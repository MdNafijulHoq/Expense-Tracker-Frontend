import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export interface IExpRes {
  _id: string
  title: string
  amount: number
  category: string
  date: string
  createdAt: string
  updatedAt: string
}
interface PieChartData {
  name: string;
  value: number;
}

interface ExpensePieChartProps {
  expenses: IExpRes[];
}
const ExpensePieChart = ({ expenses } : ExpensePieChartProps) => {

  // console.log("pie", expenses);

  const expensesByCategory = expenses.reduce((acc: Record<string, number>, expense: IExpRes) => {
    const { category, amount }  = expense;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const data: PieChartData[] = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

  return (
    <div className="h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent! * 100).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensePieChart;
