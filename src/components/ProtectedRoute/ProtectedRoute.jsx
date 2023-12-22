import { Navigate } from "react-router";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ element }) {
  const loggetIn = useSelector((state) => state.userSlice.loggetIn);

  return <>{loggetIn ? element : <Navigate to="/" replace />}</>;
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
};
