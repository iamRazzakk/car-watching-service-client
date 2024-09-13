import React, { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import Button from "../../shared/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ILabel from "../Form/ILabel";
import CInput from "../Form/CInput";
import { useSingInUserMutation } from "../../redux/features/auth/authApi";

// Define the type for form errors
interface FormErrors {
  [key: string]: string | undefined;
}

const SingInForm = () => {
  const [signInUser, { isLoading }] = useSingInUserMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    try {
      const response = await signInUser(formData).unwrap();

      if (response.success) {
        localStorage.setItem("accessToken", response.accessToke);
        localStorage.setItem("refreshToken", response.refreshToke);
        toast.success("User logged in successfully!");
        navigate("/");
      } else {
        toast.error(response.message || "Sign in failed.");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`Failed to sign in: ${error?.message || error}`);
    }
  };

  return (
    <div className="lg:mt-8 md:mt-6 mt-4">
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="flex flex-col">
            <ILabel htmlFor="email" label="Email" />
            <CInput
              name="email"
              type="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <ILabel htmlFor="password" label="Password" />
            <CInput
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password} // Display specific error message
            />
          </div>

          {/* Submit Button */}
          <Button
            text="Sign In"
            category="secondary"
            className="w-full mx-auto"
            type="submit"
            disabled={isLoading}
          />

          {/* Divider */}
          <div className="my-4 text-center text-gray-500">or sign in with</div>

          {/* Social Login Buttons */}
          <div className="flex flex-col space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black"
              onClick={() => toast("Google sign in coming soon!")}
            >
              <FaGoogle className="mr-2" />
              Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black"
              onClick={() => toast("Facebook sign in coming soon!")}
            >
              <FaFacebook className="mr-2 text-blue-600" />
              Facebook
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/auth/singup" className="text-primary font-semibold">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingInForm;
