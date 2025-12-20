import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1f1f1f] text-white px-4 overflow-hidden ">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-extrabold text-amber-400 mb-4">404</h1>

        <p className="text-xl font-semibold mb-2">Page not found</p>

        <p className="text-gray-400 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg bg-amber-400 text-gray-900 font-semibold hover:bg-amber-300 transition"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
