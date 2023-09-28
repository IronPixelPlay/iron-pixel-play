import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import service from "../services/file-upload.service";

function EditProfile(props) {
  const { isLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [upload, setUpload] = useState(false)

  const navigate = useNavigate();

  const setProfileData = () => {
    setName(props.name);
    setEmail(props.email);
    setImage(props.image);
  };

  useEffect(() => {
    setProfileData();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("authToken");

    const requestBody = { name, password, email, image };

    axios
      .put(`${import.meta.env.VITE_API_URL}/user`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        props.refreshProfileData();
        props.setEditMode(false);
      })
      .catch((err) => console.log(err));
  };

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
        {isLoggedIn ? (
          <Form onSubmit={handleFormSubmit}>
            <Row className="justify-content-center">
              <Col xs={12} sm={8} md={6}>
                <h3 className="text-center" style={{ marginTop: "10px" }}>
                  Edit Profile
                </h3>
                <Form.Group controlId="name">
                  <Form.Label>Name*:</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

                <Form.Group controlId="email">
                  <Form.Label>Email*:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password*:</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="text-center">
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginBottom: "5px", marginTop: "5px", visibility: upload ? "hidden" : "visible" }}
                  >
                    Save
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        ) : (
          <></>
        )}
      </Card>
    </Container>
  );
}

export default EditProfile;
