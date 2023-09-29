import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import {
  Navbar,
  Nav,
  Button,
  Container,
  NavDropdown,
  Image,
} from "react-bootstrap";
import defaultImage from "../images/pacman-6450.gif";

function NavbarComponent(props) {
  const { isLoggedIn, user: userAtLogin, logOutUser } = useContext(AuthContext);

  const user = (props.userInfo !== null) ? props.userInfo : userAtLogin

  return (
    <Navbar
      sticky="top"
      className="bright-shadow"
      bg="dark"
      expand="lg"
      style={{ borderRadius: "10px" }}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" style={{ color: "white" }}>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <NavDropdown
              title="Games"
              id="basic-nav-dropdown"
              className="custom-dropdown"
            >
              <NavDropdown.Item as={NavLink} to="/games">All Games</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/games/sort/Action-Adventure">
                Action-Adventure
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/games/sort/Shooter">
                Shooter
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/games/sort/Fighting">
                Fighting
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/games/sort/Quiz&Trivia">
                Quiz & Trivia
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/games/sort/Strategy">
                Strategy
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/games/sort/Sports&Racing">
                Sports & Racing
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/games/sort/Puzzle">
                Puzzle
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/games/sort/Other">
                Other
              </NavDropdown.Item>
            </NavDropdown>

            {isLoggedIn && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/games/create"
                  style={{ color: "white" }}
                >
                  Upload your Game
                </Nav.Link>
              </>
            )}
          </Nav>
          <div className="navbar-right">
            {isLoggedIn ? (
              <>
                <span
                  className="navbar-text d-lg-none"
                  style={{ color: "white" }}
                >
                  
                  Hi {user && user.name}!{" "}
                  <Image
                    style={{ width: "1em", height: "1em", borderRadius: "50%" }}
                    src={(user && user.image) || (user && defaultImage)}
                    alt={user && user.name}
                  />
                  
                </span>
                <Button
                  variant="danger"
                  onClick={logOutUser}
                  className="d-lg-none"
                >
                  Logout
                </Button>
              </>
            ) : (
               <>
                <Nav>
                  <Nav.Link
                    as={NavLink}
                    to="/signup"
                    style={{ color: "white" }}
                    className="d-lg-none"
                  >
                    Sign Up
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/login"
                    style={{ color: "white" }}
                    className="d-lg-none"
                  >
                    Login
                  </Nav.Link>
                </Nav>
              </>
             )} 
          </div> 
        </Navbar.Collapse>


        <div className="navbar-right d-none d-lg-block">
          {isLoggedIn ? (
            <>
            <Nav>
              <Nav.Link as={NavLink} to="/user" style={{ color: "white" }}>
              <span className="navbar-text" style={{ color: "white" }}>
                Hi {user && user.name}!{" "}
                <Image
                  style={{ width: "2em", height: "2em", borderRadius: "50%" }}
                  src={(user && user.image) || (user && defaultImage)}
                  alt={user && user.name}
                />
              </span>
                </Nav.Link>
              <Button variant="danger" onClick={logOutUser}>
                Logout
              </Button>
            
            </Nav>
            </>
          ) : (
            <>
              <Nav>
                <Nav.Link as={NavLink} to="/signup" style={{ color: "white" }}>
                  Sign Up
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login" style={{ color: "white" }}>
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

export default NavbarComponent;
