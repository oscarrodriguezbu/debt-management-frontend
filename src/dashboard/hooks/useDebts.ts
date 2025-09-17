import { useQuery } from "@tanstack/react-query"
import { getUserDebtsAction } from "../actions/get-user-debts.action"
import { useSearchParams } from "react-router";

export const useDebts = () => {
    const [searchParams] = useSearchParams();
    const isPaid = searchParams.get('isPaid') || undefined;

    return useQuery({
        queryKey: [
            'debts/userDebts',
            { isPaid },
        ],
        queryFn: () => getUserDebtsAction({ isPaid }),
        staleTime: 1000 * 60 * 5,
    })
}
