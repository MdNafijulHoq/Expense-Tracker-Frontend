import DeleteConfirmation from "@/components/DeleteConfirmation";
import AddExpenseModal from "@/components/Expense/AddExpenseModal";
import UpdateExpenseModal from "@/components/Expense/UpdateExpenseModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetExpensesQuery,
  useLazyGetSingleExpenseQuery,
  useRemoveExpenseMutation,
} from "@/redux/features/Expense/expense.api";
import { setValue } from "@/redux/features/Expense/expense.slice";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface IExpenseType {
  _id: string;
  title: string;
  category: string;
  amount: string | number;
}

const Expenses = () => {
  const { data } = useGetExpensesQuery(undefined);
  // console.log("data is", data);
  const dispatch = useDispatch();

  const totalExpense =
    data?.reduce(
      (acc: number, curr: { amount: number | string }) =>
        acc + Number(curr.amount),
      0
    ) ?? 0;

  const [triggerGetSingleExpense] = useLazyGetSingleExpenseQuery();
  const [removeExpense] = useRemoveExpenseMutation();

  const handleUpdateExpense = async (expenseId: string) => {
    // console.log(expenseId);
    const res = await triggerGetSingleExpense(expenseId);
    // console.log("single data", res.data);
    dispatch(setValue(res.data));
  };

  const handleRemoveExpense = async (divisionId: string) => {
    const toastId = toast.loading("Removing...");
    try {
      const res = await removeExpense(divisionId).unwrap();
      if (res.success) {
        toast.success("Expense Remove Successfully", { id: toastId });
      } else {
        toast.error("Something wrong!", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong!", { id: toastId });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">
          Total Expense -{" "}
          <span className="text-sm rounded-full p-3 bg-blue-600">
            {totalExpense}
          </span>
        </h1>
        <AddExpenseModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableCaption>A list of Expenses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[350px]"> Title</TableHead>
              <TableHead className="w-[350px]"> Category</TableHead>
              <TableHead className="w-[350px]"> Amount</TableHead>
              <TableHead className="text-right">Update</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item: IExpenseType) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium w-[100px]">
                  {item?.title}
                </TableCell>
                <TableCell className="font-medium w-[100px]">
                  {item?.category}
                </TableCell>
                <TableCell className="font-medium w-[100px]">
                  {item?.amount}
                </TableCell>
                <TableCell
                  onClick={() => handleUpdateExpense(item._id)}
                  className="text-right"
                >
                  <UpdateExpenseModal />
                </TableCell>
                <TableCell className="text-right">
                  <DeleteConfirmation
                    onConfirm={() => handleRemoveExpense(item._id)}
                  >
                    <Button className="cursor-pointer" size="sm">
                      <Trash2 />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Expenses;
