import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";
import { currencyFormatter } from "@/components/lib/currency-formatter";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardTitle } from "@/dashboard/components/DashboardTitle";
import { useDebts } from "@/dashboard/hooks/useDebts";
import { useSearchParams } from "react-router";
import {
  MessageCircleQuestionMark
} from 'lucide-react';

export const UserDebtsPage = () => {
  const { data, isLoading } = useDebts();

  const [searchParams, setSearchParams] = useSearchParams();
  const isPaid = searchParams.get('isPaid') ?? "";


  const handleInputChange = (value: string) => {
    searchParams.set('isPaid', value);
    setSearchParams(searchParams);
  };

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  return (
    <>
      <DashboardTitle
        title="My Debts"
        subtitle="Here you can see the list of your debts."
      />

      <div className="mb-10">
        <Select value={isPaid === 'false' || isPaid === 'true' ? isPaid : 'false'} onValueChange={handleInputChange}>
          <SelectTrigger className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
            <SelectValue placeholder="Select the debt status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="false">Outstanding debt</SelectItem>
            <SelectItem value="true">Debt paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {data && data.length > 0 ?
        (
          <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] px-4">Creditor Name</TableHead>
                <TableHead className='px-4'>Email</TableHead>
                <TableHead className="text-right px-4">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((debt) => (
                <TableRow key={debt.id}>
                  <TableCell className='px-4'>{debt.creditor.name}</TableCell>
                  <TableCell className='px-4'>{debt.creditor.email}</TableCell>
                  <TableCell className="text-right px-4">
                    {currencyFormatter(debt.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
        : (
          <div>
            <Card className="w-[600px]">
              <CardHeader className="flex gap-6 items-center justify-center">
                <img
                  src="./src/assets/makima.png"
                  alt="Card content"
                  className="w-[300px] rounded-md object-cover object-[center_38%] aspect-5/6"
                />
                <div className="flex flex-col gap-6 items-center justify-center">
                  <MessageCircleQuestionMark size={50} className="flex-shrink-0" />
                  <CardTitle className="mb-3">There are no debts to show</CardTitle>
                  <CardDescription>Life hack: If you don't owe money, borrow some. If you already do, pay it back. Stop being stingy.</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
        )
      }
    </>
  );
};
