import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import service from "../services/file-upload.service";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("")
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [upload, setUpload] = useState(false)

  const navigate = useNavigate();

  const handleFileUpload = (e) => {

    const uploadData = new FormData();

    uploadData.append("image", e.target.files[0]);

    setUpload(true)

    service
      .uploadImage(uploadData)
      .then((response) => {
        setImage(response.fileUrl);
        setUpload(false)
      })
      .catch((err) => {
        setUpload(false)
        console.log("Error while uploading the file: ", err);
      })
  };

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name, image };

    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
    >
      <Card
        bg="dark"
        text="white"
        className="card-with-spacing bright-shadow"
        style={{ width: "700px" }}
      >
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6}>
            <h3 className="text-center" style={{ marginTop: "10px" }}>
              Sign Up
            </h3>
            <Form.Group controlId="name">
              <Form.Label>Name*:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                required
              />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Profile Picture:</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFileUpload(e)}
              />
            </Form.Group>

            <Form onSubmit={handleSignupSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email*:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmail}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password*:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePassword}
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginBottom: "5px", marginTop: "5px", visibility: upload ? "hidden" : "visible" }}
                >
                  Sign Up
                </Button>
              </div>
            </Form>

            {errorMessage && (
              <p className="text-danger text-center">{errorMessage}</p>
            )}

            <p className="text-center">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default SignupPage;
