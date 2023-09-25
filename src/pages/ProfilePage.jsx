import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";


function ProfilePage() {
  const [profileData, setProfileData] = useState(null)

  const storedToken = localStorage.getItem('authToken'); 

  const getProfileData = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data)
        console.log("profileInfo", response.data.user.name)
        setProfileData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const renderUser = () => {
    if (profileData === null) {
      return <h1>Loading</h1>;
    }

    return (
      <Container>
        <h1>Hi {profileData.user.name}</h1>
  
        <Row>
          <Col>
            <Card bg="dark" text="white" className="card-with-spacing bright-shadow">
              <Card.Body>
                <h2>Your current games:</h2>
                {profileData.game.map((userGame) => (
                  <div key={userGame.demo}>
                    <Link to={`/games/${userGame._id}`}>
                      <Card bg="dark" text="white" className="card-with-spacing bright-shadow">
                        <Card.Img
                          style={{ width: '100%', height: '170px', objectFit: 'cover' }}
                          variant="top"
                          src={userGame.image}
                        />
                        <Card.Body>
                          <Card.Title>{userGame.title}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="dark" text="white" className="card-with-spacing bright-shadow">
              <Card.Body>
                <h2>Your recent activity:</h2>
                {profileData.reviews.map((userReview) => (
                  <div key={userReview.title}>
                    <Link to={`/games/${userReview.game}`}>
                      <Card bg="dark" text="white" className="card-with-spacing bright-shadow">
                        <Card.Body>
                          <Card.Title>{userReview.title}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return <>{renderUser()}</>;
}

export default ProfilePage;