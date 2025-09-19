import { getUsersAction } from "@/auth/actions/get-users.action";
import { useQuery } from "@tanstack/react-query"

export const useSearchCreditors = () => {
    return useQuery({
        queryKey: ["creditors"],
        queryFn: () => getUsersAction(),
        retry: false,
        staleTime: 1000 * 5,
    })
}
