import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDebAction } from "../actions/create-debt.action";
import { toast } from "sonner";

export const useCreateDebt = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createDebAction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["debts/userDebts"] });
            toast.success("Debt created successfully.", {
                position: "top-right",
            });
        },
        onError: (err) => {
            toast.error((err).message);
        },
    });
};