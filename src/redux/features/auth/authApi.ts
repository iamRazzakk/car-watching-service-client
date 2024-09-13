import { baseApi } from "../../Api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData) => ({
        method: "POST",
        url: "/singup",
        body: userData,
      }),
    }),

    singInUser:builder.mutation({
      query:(logInData)=>({
        method:"POST",
        url:"/login",
        body:logInData
      })
    })
  }),

});
export const { useCreateUserMutation, useSingInUserMutation } = authApi;
export default authApi;
