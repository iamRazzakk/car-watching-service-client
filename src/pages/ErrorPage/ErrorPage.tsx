import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="text-9xl font-bold text-red-600">404</div>
        <h1 className="text-4xl font-semibold text-gray-800">Oops! Page Not Found</h1>
        <p className="mt-4 text-gray-600">The page you're looking for does not exist.</p>
        <Link 
          to="/" 
          className="mt-8 inline-block px-6 py-3 text-white bg-blue-600 rounded-md shadow-lg hover:bg-blue-700"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
