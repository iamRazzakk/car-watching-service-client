import { Link } from "react-router-dom";
import Button from "../../shared/Button/Button";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl text-gray-600 mt-4">Oops! Page not found.</p>
      <p className="text-lg text-gray-500 mt-2">
        The page you're looking for might have been moved or deleted.
      </p>
      <div className="mt-6 flex flex-col space-y-4">
        <Link to="/">
          <Button text="Go to Home" category="primary" />
        </Link>
        <Link to="/auth/login">
          <Button text="Go to Login" category="secondary" />
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
