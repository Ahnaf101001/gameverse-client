import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-lg text-indigo-400"></span>
      </div>
    );
  }

  if (user && isAdmin) return children;

  // Not an admin — redirect to home with a message
  return <Navigate to="/" replace />;
};

export default AdminRoute;

AdminRoute.propTypes = {
  children: PropTypes.node,
};
