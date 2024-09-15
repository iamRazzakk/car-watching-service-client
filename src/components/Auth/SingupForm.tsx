import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import Button from "../../shared/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ILabel from "../Form/ILabel";
import CInput from "../Form/CInput";
import { useCreateUserMutation } from "../../redux/features/auth/authApi";

// Define the type for form errors
interface FormErrors {
  [key: string]: string | undefined;
}

const SignupForm = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    // role: "USER",
  });
  // State to manage form field errors
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    try {
      await createUser(formData).unwrap();
      toast.success('User created successfully!');
      navigate('/auth/login');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Update formErrors state with server-side validation errors
      if (err?.data?.errors) {
        // Example error structure: { errors: { fieldName: "error message" } }
        setFormErrors(err.data.errors);
      } else {
        toast.error(`Failed to create user: ${err?.message || err}`);
      }
    }
  };

  return (
    <div className="lg:mt-8 md:mt-6 mt-4">
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <ILabel label="Name" htmlFor="name" />
            <CInput
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              error={formErrors.name} // Pass the error message
            />
          </div>
          <div className="flex flex-col">
            <ILabel label="Email" htmlFor="email" />
            <CInput
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email} 
            />
          </div>
          <div className="flex flex-col">
            <ILabel label="Phone" htmlFor="phone" />
            <CInput
              name="phone"
              type="text"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              error={formErrors.phone} // Pass the error message
            />
          </div>
          <div className="flex flex-col">
            <ILabel label="Password" htmlFor="password" />
            <CInput
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password} // Pass the error message
            />
          </div>
          <div className="flex flex-col">
            <ILabel label="Address" htmlFor="address" />
            <CInput
              name="address"
              type="text"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              error={formErrors.address} // Pass the error message
            />
          </div>
          <Button
            text="Sign up"
            category="primary"
            className="w-full mx-auto"
            type="submit"
            disabled={isLoading}
          />
          <div className="my-4 text-center text-gray-500">or sign up with</div>
          <div className="flex flex-col space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black"
              onClick={() => toast("Google sign up coming soon!")}
            >
              <FaGoogle className="mr-2" />
              Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black"
              onClick={() => toast("Facebook sign up coming soon!")}
            >
              <FaFacebook className="mr-2 text-blue-600" />
              Facebook
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-primary font-semibold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
