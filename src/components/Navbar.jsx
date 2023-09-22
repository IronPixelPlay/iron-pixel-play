import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const {
    isLoggedIn,
    user,
    logOutUser
  } = useContext(AuthContext);

  return (
    <nav>
      <NavLink to="/">
        <button>Home</button>
      </NavLink>
      <NavLink to="/games">
        <button>Games</button>
      </NavLink>

      {isLoggedIn && (
        <>
          <NavLink to="/games/create">
            <button>Upload your game!</button>
          </NavLink>
          <NavLink to="/user">
            {" "}
            <button>My Profile</button>{" "}
          </NavLink>
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <NavLink to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </NavLink>
          <NavLink to="/login">
            {" "}
            <button>Login</button>{" "}
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default Navbar;