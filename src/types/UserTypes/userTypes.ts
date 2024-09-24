export type UserFormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
};
export type UserRole = 'ADMIN' | 'USER';

export type UserProfile = {
  name?: string;
  phone?: string;
  address?: string;
  profilePic?: string;
  role:UserRole;
};

export type UserPasswordUpdate = {
  email?:string
  oldPassword: string;
  newPassword: string;
};
