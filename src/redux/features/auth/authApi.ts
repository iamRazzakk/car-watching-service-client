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
    userUpdateRole: builder.mutation({
      query:({role, userId})=>({
        method: "PATCH",
        url: `auth/users/${userId}/role`,
        body: { role },
      })
    })
  }),
});

export const { useCreateUserMutation, useSingInUserMutation, useGetAllUsersQuery, useUserUpdateRoleMutation } = authApi;
export default authApi;
