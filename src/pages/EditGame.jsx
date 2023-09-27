import axios from "axios";
import service from "../services/file-upload.service";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";

function EditGame({ storedToken }) {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [demo, setDemo] = useState("");
    const [category, setCategory] = useState("");
    const [instructions, setInstructions] = useState("");
    const [description, setDescription] = useState("");
    const [gitHubLink, setGitHubLink] = useState("")
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
    const { gameId } = useParams();



    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/games/${gameId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                if (response.data.user !== user._id) {
                    navigate('/games')
                }
                const gameToEdit = response.data
                setTitle(gameToEdit.title);
                setImage(gameToEdit.image);
                setDemo(gameToEdit.demo);
                setCategory(gameToEdit.category);
                setInstructions(gameToEdit.instructions);
                setDescription(gameToEdit.description);
                setGitHubLink(gameToEdit.gitHubLink);
            })
            .catch((error) => console.log(error));
    }, [gameId]);

    const handleFileUpload = (e) => {

        const uploadData = new FormData();

        uploadData.append("image", e.target.files[0]);

        service
            .uploadImage(uploadData)
            .then((response) => {
                setImage(response.fileUrl);
            })
            .catch((err) => console.log("Error while uploading the file: ", err));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const requestBody = { title, image, demo, category, instructions, description, gitHubLink };
        axios
            .put(`${import.meta.env.VITE_API_URL}/games/${gameId}/edit`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                navigate(`/games/`)
            })
            .catch((err) => console.log(err));
    }

    const handleDelete = () => {
        axios
            .delete(`${import.meta.env.VITE_API_URL}/games/${gameId}`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then(() => {
                navigate(`/games/`);
            })
            .catch((err) => console.log(err));
    };

    return title && (
        <Container fluid className="d-flex align-items-center justify-content-center">
            <Card bg="dark" text="white" className="card-with-spacing bright-shadow" style={{ width: '700px' }}>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6}>
                        <h3 className="text-center">Edit Game</h3>
                        <Form onSubmit={handleFormSubmit}>
                            <div className="text-center">
                                <Form.Group controlId="title">
                                    <Form.Label>Title:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={title}
                                        required
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="image">
                                    <Form.Label>Image:</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={(e) => handleFileUpload(e)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="demo">
                                    <Form.Label>Demo:</Form.Label>
                                    <Form.Control
                                        type="url"
                                        value={demo}
                                        required
                                        onChange={(e) => setDemo(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="category">
                                    <Form.Label>Category:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="Not-Specified">Select</option>
                                        <option value="Action-Adventure">Action-Adventure</option>
                                        <option value="Shooter">Shooter</option>
                                        <option value="Fighting">Fighting</option>
                                        <option value="Quiz&Trivia">Quiz & Trivia</option>
                                        <option value="Strategy">Strategy</option>
                                        <option value="Sports&Racing">Sports & Racing</option>
                                        <option value="Puzzle">Puzzle</option>
                                        <option value="Other">Other</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="description">
                                    <Form.Label>Description:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        value={description}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 60) {
                                                setDescription(e.target.value);
                                            }
                                        }}
                                    />
                                    <Form.Label style={{ color: 'white', fontSize: '14px' }}>
                                        {60 - description.length} characters remaining
                                    </Form.Label>
                                </Form.Group>

                                <Form.Group controlId="instructions">
                                    <Form.Label>Instructions:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        value={instructions}
                                        onChange={(e) => setInstructions(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="gitHubLink">
                                    <Form.Label>Your GitHub Link:</Form.Label>
                                    <Form.Control
                                        type="url"
                                        value={gitHubLink}
                                        required
                                        onChange={(e) => setGitHubLink(e.target.value)}
                                    />
                                </Form.Group>
                            </div>
                            <div className="text-center">
                                <Button variant="primary" type="submit" style={{ marginBottom: "5px", marginTop: "5px" }}>
                                    Update
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </Container>

    );

}

export default EditGame