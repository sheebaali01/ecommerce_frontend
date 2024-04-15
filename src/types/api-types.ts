import { User } from "./types";

export type MessageResponse = {
    success: boolean;
    message: string;
}

export type UerResponse = {
    success: boolean;
    user: User;
}