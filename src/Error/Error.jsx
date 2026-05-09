import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-900 text-white px-4">
      <h1 className="text-8xl font-black text-red-500">404</h1>
      <h2 className="text-4xl font-bold text-center">Page Not Found</h2>
      <p className="text-xl text-gray-400 text-center">
        Oops! Looks like you ran into a problem.
      </p>
      <Link
        to="/"
        className="btn bg-indigo-500 hover:bg-indigo-600 text-white border-none text-xl px-8"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
