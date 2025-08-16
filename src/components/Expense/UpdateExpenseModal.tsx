/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, SquarePen } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { useUpdateExpenseMutation } from "@/redux/features/Expense/expense.api";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  removeValue,
  selectValue,
} from "@/redux/features/Expense/expense.slice";

const expenseCategories = [
  { id: 1, value: "Food", label: "Food" },
  { id: 2, value: "Groceries", label: "Groceries" },
  { id: 3, value: "Transport", label: "Transport" },
  { id: 4, value: "Fuel", label: "Fuel" },
  { id: 5, value: "Parking", label: "Parking" },
  { id: 6, value: "Shopping", label: "Shopping" },
  { id: 7, value: "Clothing", label: "Clothing" },
  { id: 8, value: "Utilities", label: "Utilities" },
  { id: 9, value: "Rent", label: "Rent" },
  { id: 10, value: "Mortgage", label: "Mortgage" },
  { id: 11, value: "Healthcare", label: "Healthcare" },
  { id: 12, value: "Medicines", label: "Medicines" },
  { id: 13, value: "Insurance", label: "Insurance" },
  { id: 14, value: "Education", label: "Education" },
  { id: 15, value: "Entertainment", label: "Entertainment" },
  { id: 16, value: "Dining Out", label: "Dining Out" },
  { id: 17, value: "Coffee/Tea", label: "Coffee/Tea" },
  { id: 18, value: "Subscriptions", label: "Subscriptions" },
  { id: 19, value: "Mobile", label: "Mobile" },
  { id: 20, value: "Internet", label: "Internet" },
  { id: 21, value: "Gifts", label: "Gifts" },
  { id: 22, value: "Donations", label: "Donations" },
  { id: 23, value: "Personal Care", label: "Personal Care" },
  { id: 24, value: "Home Maintenance", label: "Home Maintenance" },
  { id: 25, value: "Pet Care", label: "Pet Care" },
  { id: 26, value: "Child Care", label: "Child Care" },
  { id: 27, value: "Taxi/RideShare", label: "Taxi/RideShare" },
  { id: 28, value: "Public Transport", label: "Public Transport" },
  { id: 29, value: "Others", label: "Others" },
];

const expenseSchema = z.object({
  title: z.string({ error: "title is Required" }),
  amount: z.string().min(1, "amount is required"),
  category: z.string({ error: "category is Required" }),
  date: z.date({ message: "Date is required" }),
});

const UpdateExpenseModal = () => {
  const [open, setOpen] = useState(false);
  const [updateExpense] = useUpdateExpenseMutation();
  const value = useSelector(selectValue);
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      amount: "",
      category: "",
    },
  });

  //   console.log(value?._id);

  useEffect(() => {
    if (value) {
      form.reset({
        title: value.title || "",
        amount: String(value.amount) || "",
        category: "",
      });
    }
  }, [value, form]);

  const onSubmit = async (data: z.infer<typeof expenseSchema>) => {
    if (!data.category) {
      return toast.error("Choose category");
    }
    if (!data.date) {
      return toast.error("Choose date");
    }
    // console.log(data.date);
    const expenseInfo = {
      title: data.title,
      amount: Number(data.amount),
      category: data.category,
      date: data.date,
    };
    const toastId = toast.loading("Updating expense....");

    try {
      const res = await updateExpense({
        expenseId: value?._id,
        expenseInfo,
      }).unwrap();
      // console.log(res);
      if (res.success) {
        toast.success("Expense updated Successfully", { id: toastId });
        setOpen(false);
        form.reset();
        dispatch(removeValue());
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch (err: any) {
      console.log(err);
      setOpen(true);
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update your expense information...</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="add-expense"
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="amount here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex-1 ">
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {expenseCategories.map((category) => (
                        <SelectItem key={category.id} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <
                          new Date(new Date().setDate(new Date().getDate() - 1))
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => dispatch(removeValue())} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button form="add-expense" type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateExpenseModal;
