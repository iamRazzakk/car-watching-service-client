import { UserPasswordUpdate, UserProfile } from "../../../types/UserTypes/userTypes";
import { baseApi } from "../baseApi";


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for uploading a profile picture
    uploadProfilePicture: builder.mutation<UserProfile, FormData>({
      query: (formData) => ({
        url: '/auth/upload-avatar',
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['User'],
    }),
    // Endpoint for changing the password
    changePassword: builder.mutation<void, UserPasswordUpdate>({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
      // Define how the cache should be managed if needed
      invalidatesTags: ['User'],
    }),
  }),
});

export const {  useChangePasswordMutation, useUploadProfilePictureMutation } = authApi;
