import type { User } from "./user.interface";

export interface DebtsResponse {
    id:          number;
    amount:      number;
    description: string;
    isPaid:      boolean;
    createdAt:   Date;
    updatedAt:   Date;
    debtor:      User;
    creditor:    User;
}
