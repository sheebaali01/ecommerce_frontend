import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { MessageResponse,UserResponse } from "../../types/api-types";
import { User } from "../../types/types";

export const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`}),
    endpoints: (builder) => ({
        latestProducts: builder.query({
            query: () => 'latest'
        }),
    }),
});

export const getUser = async(id:string) => {
    try {
        const {data}:{data:UserResponse} = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
}

export const {useLoginMutation} = userAPI;