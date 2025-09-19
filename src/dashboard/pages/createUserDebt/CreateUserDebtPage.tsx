import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { X, SaveAll } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardTitle } from "@/dashboard/components/DashboardTitle";
import { useSearchCreditors } from "@/auth/hooks/useSearchCreditors";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Debt } from "@/interfaces/debs.interface";
import { useCreateDebt } from "@/dashboard/hooks/useCreateDebt";
import { useNavigate } from "react-router";

const defaultValues = {
  amount: undefined,
  creditorId: undefined,
  description: undefined,
};

export const CreateUserDebtPage = () => {
  const navigate = useNavigate();
  const { data: creditors, isLoading, isError } = useSearchCreditors();
  const { mutateAsync, isPending } = useCreateDebt();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Debt>({
    defaultValues,
  });

  useEffect(() => {
    if (isError) {
      toast.error("There was a problem loading users.");
    }
  }, [isError]);

  const onSubmit = async (data: Debt) => {
    await mutateAsync(data, {
      onSuccess: () => {
        navigate(`/debts`);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" grid grid-cols-1 md:grid-cols-2 justify-between items-center">
        <DashboardTitle
          title="Create Debt"
          subtitle="Here you can create a new debt."
        />
        <div className="flex md:justify-end mb-10 gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => reset()}
            disabled={isPending}
          >
            <X className="w-4 h-4" />
            Cancell
          </Button>
          <Button className="cursor-pointer" type="submit" disabled={isPending}>
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ? field.value?.toString() : ""}
                        >
                          <SelectTrigger
                            className={cn(
                              "w-full px-4 py-6 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-transparent transition-all duration-200",
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
                              {!isLoading &&
                                creditors &&
                                creditors.length > 0 &&
                                creditors.map((c) => (
                                  <SelectItem key={c.id} value={String(c.id)}>
                                    {c.name}
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.creditorId && (
                      <p className="text-red-500 text-sm">
                        {errors.creditorId.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="creditor"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Amount (&yen;)*
                    </label>
                    <input
                      {...register("amount", {
                        required: "The amount field is required",
                        min: {
                          value: 1,
                          message: "The amount field must be greater than 0",
                        },
                      })}
                      min={1}
                      type="number"
                      className={cn(
                        "w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-transparent focus-visible:outline-none transition-all duration-200",
                        {
                          "border-red-500": errors.amount,
                        }
                      )}
                      placeholder="Debt Value"
                    />
                    {errors.amount && (
                      <p className="text-red-500 text-sm">
                        {errors.amount.message}
                      </p>
                    )}
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
                    {...register("description", {
                      maxLength: {
                        value: 300,
                        message:
                          "The description field must not have more than 300 characters",
                      },
                      validate: (value) => {
                        if (value && value.trim().length === 0) {
                          return "The description field cannot consist only of spaces or line breaks";
                        }
                        return true;
                      },
                    })}
                    rows={5}
                    className={cn(
                      "w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-transparent focus-visible:outline-none transition-all duration-200",
                      {
                        "border-red-500": errors.description,
                      }
                    )}
                    placeholder="Debt Description"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
