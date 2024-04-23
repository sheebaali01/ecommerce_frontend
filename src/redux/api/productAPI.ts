import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { AllProductsResponse, CategoriesResponse, MessageResponse,SearchProductsRequest,SearchProductsResponse,UserResponse } from "../../types/api-types";
import { User } from "../../types/types";

export const productAPI = createApi({
    reducerPath: "productAPI",
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`}),
    endpoints: (builder) => ({
        latestProducts: builder.query<AllProductsResponse,string>({
            query: () => 'latest'
        }),
        allProducts: builder.query<AllProductsResponse,string>({
            query: (id) => `admin-products?id=${id}`,
        }),
        categories: builder.query<CategoriesResponse,string>({
            query: () => `categories`,
        }),
        searchProducts: builder.query<SearchProductsResponse,SearchProductsRequest>({
            query: ({price,search,sort,category,page}) => {
                let base = `all?search=${search}&page=${page}`;

                if(price) base+= `&price=${price}`;
                if(sort) base+= `&sort=${sort}`;
                if(category) base+= `&category=${category}`;

                return base;
            },
        }),
    }),
});



export const {useLatestProductsQuery,useAllProductsQuery,useCategoriesQuery,useSearchProductsQuery} = productAPI;