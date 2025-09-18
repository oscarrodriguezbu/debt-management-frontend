import { DashboardTitle } from "@/dashboard/components/DashboardTitle";
import { X, SaveAll } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Debts } from "@/interfaces/debs.interface";
import { cn } from "@/lib/utils";
import { useSearchCreditors } from "@/auth/hooks/useSearchCreditos";

const defaultValues = {
  amount: undefined,
  creditorId: undefined,
  description: undefined,
}

export const CreateUserDebtPage = () => {
  const { data: creditors, isLoading, isError } = useSearchCreditors();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<Debts>({
    defaultValues,
  });

  const onSubmit = (data: Debts) => {
    console.log("Form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" grid grid-cols-1 md:grid-cols-2 justify-between items-center">
        <DashboardTitle
          title="Create Debt"
          subtitle="Here you can create a new debt."
        />
        <div className="flex md:justify-end mb-10 gap-4">
          <Button variant="outline">
            <Link to="/admin/products" className="flex items-center gap-2">
              <X className="w-4 h-4" />
              Cancell
            </Link>
          </Button>
          <Button className="cursor-pointer" type="submit">
            <SaveAll className="w-4 h-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Debt Information
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="creditor"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Creditor*
                    </label>
                    <Controller
                      name="creditorId"
                      control={control}
                      rules={{ required: "The debt state is required" }}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger
                            className={cn(
                              "w-full px-4 py-6 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200",
                              {
                                "border-red-500": errors.creditorId,
                              }
                            )}
                          >
                            <SelectValue placeholder="Select the debt status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Creditors</SelectLabel>
                              {
                                !isLoading && creditors && creditors.length > 0 &&
                                creditors.map((c) => (
                                  <SelectItem key={c.id} value={String(c.id)}>
                                    {c.name}
                                  </SelectItem>
                                ))
                              }
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="creditor"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Amount ($)*
                    </label>
                    <input
                      {...register("amount", {
                        required: true,
                        min: 1,
                      })}
                      min={1}
                      type="number"
                      className={cn(
                        "w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200",
                        {
                          "border-red-500": errors.amount,
                        }
                      )}
                      placeholder="Debt Value"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    {...register("description", { maxLength: 300 })}
                    rows={5}
                    className={cn(
                      "w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200",
                      {
                        "border-red-500": errors.description,
                      }
                    )}
                    placeholder="Debt Description"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
