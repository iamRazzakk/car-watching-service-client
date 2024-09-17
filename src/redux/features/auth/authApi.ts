import { baseApi } from "../../Api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData) => ({
        method: "POST",
        url: "/auth/singup",
        body: userData,
      }),
    }),
    singInUser: builder.mutation({
      query: (logInData) => ({
        method: "POST",
        url: "/auth/login",
        body: logInData,
      }),
    }),
    getAllUsers: builder.query({
      query: () => "auth/users",
    }),
  }),
});

export const { useCreateUserMutation, useSingInUserMutation, useGetAllUsersQuery } = authApi;
export default authApi;
