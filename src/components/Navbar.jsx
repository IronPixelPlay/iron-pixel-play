import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

function NavBar() {
  const {
    isLoggedIn,
    user,
    logOutUser
  } = useContext(AuthContext);

  return (
    <Navbar className="bright-shadow" bg="dark" expand="lg" style={{ borderRadius: '10px' }}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" style={{ color: 'white' }}>
          Home
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/games" style={{ color: 'white' }}>
            Games
          </Nav.Link>
          {isLoggedIn && (
            <>
              <Nav.Link as={NavLink} to="/games/create" style={{ color: 'white' }}>
                Upload your Game
              </Nav.Link>
              <Nav.Link as={NavLink} to="/user" style={{ color: 'white' }}>
                My Profile
              </Nav.Link>
            </>
          )}
        </Nav>
        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              <span className="navbar-text" style={{ color: 'white' }}>
                Hi {user && user.name}!
              </span>
              <Button variant="danger" onClick={logOutUser}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Nav>
                <Nav.Link as={NavLink} to="/signup" style={{ color: 'white' }}>
                  Sign Up
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login" style={{ color: 'white' }}>
                  Login
                </Nav.Link>
              </Nav>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;