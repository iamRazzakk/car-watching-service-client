import { FaEnvelope, FaLock } from "react-icons/fa";
import Button from "../../shared/Button/Button";
import { Link } from "react-router-dom";

const SingInForm = () => {
  return (
    <div className="lg:mt-8 md:mt-6 mt-4">
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
        <form className="space-y-4">
          {/* Name Field */}

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
            text="Sing In"
            category="secondary"
            className="w-full mx-auto"
          />
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
