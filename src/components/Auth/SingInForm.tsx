import React, { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import Button from "../../shared/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ILabel from "../Form/ILabel";
import CInput from "../Form/CInput";
import { useSingInUserMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authslice";
import { useAppDispatch } from "../../redux/hooks";

const SingInForm = () => {
  const [signInUser, { isLoading }] = useSingInUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signInUser(formData).unwrap();
      // console.log(res);
      const user = res.data;
      const token = res.accessToke;
      const userData = { user, token };
      if (res.success) {
        // Dispatch the setUser action with correct payload
        dispatch(setUser(userData));

        toast.success("User logged in successfully!");
        navigate("/dashboard/me");
      } else {
        toast.error(res.message || "Sign in failed.");
      }
    } catch (error) {
      const errorMessage =
        (error as Error).message || "An unknown error occurred";
      toast.error(`Failed to sign in: ${errorMessage}`);
    }
  };

  return (
    <div className="lg:mt-8 md:mt-6 mt-4">
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <ILabel htmlFor="email" label="Email" />
            <CInput
              name="email"
              type="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              // error={formErrors.email}
            />
          </div>

          <div className="flex flex-col">
            <ILabel htmlFor="password" label="Password" />
            <CInput
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              // error={formErrors.password}
            />
          </div>

          <Button
            text="Sign In"
            category="secondary"
            className="w-full mx-auto"
            type="submit"
            disabled={isLoading}
          />

          <div className="my-4 text-center text-gray-500">or sign in with</div>

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
