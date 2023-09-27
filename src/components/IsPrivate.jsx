import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

function IsPrivate({ children }) {

  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading)
    return (
      <div className="loader-container">
        <PacmanLoader
          color="#05ffe9"
          size={100}
        />
      </div>
    );


  if (!isLoggedIn) {

    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default IsPrivate;