import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa";
import Button from "../../shared/Button/Button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const SignupForm = () => {
  
  return (
    <div className="lg:mt-8 md:mt-6 mt-4">
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <form className="space-y-4">
          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="flex items-center text-black mb-1">
              <FaUser className="text-primary mr-2" />
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="flex items-center text-black mb-1"
            >
              <FaEnvelope className="text-primary mr-2" />
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="flex items-center text-black mb-1"
            >
              <FaLock className="text-primary mr-2" />
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Submit Button */}
          <Button
            text="Sign up"
            category="primary"
            className="w-full mx-auto"
          />

          {/* Divider */}
          <div className="my-4 text-center text-gray-500">or sign up with</div>

          {/* Social Login Buttons */}
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

          {/* Login Link */}
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
