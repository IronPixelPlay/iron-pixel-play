import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        console.log('JWT token', response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/user');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center">
      <Card bg="dark" text="white" className="card-with-spacing bright-shadow" style={{ width: '700px' }}>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6}>
            <h3 className="text-center" style={{ marginTop: "10px" }}>Login</h3>
            <Form onSubmit={handleLoginSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmail}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePassword}
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit" style={{ marginBottom: "5px", marginTop: "5px" }}>
                  Login
                </Button>
              </div>
            </Form>

            {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}

            <p className="text-center">Don't have an account yet? <Link to="/signup">Sign Up</Link></p>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default LoginPage;

