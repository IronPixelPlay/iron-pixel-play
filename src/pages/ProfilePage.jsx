import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { PacmanLoader } from "react-spinners";
import defaultImage from "../images/pacman-6450.gif";
import UserProfileCard from "../components/UserProfileCard";

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);

  const storedToken = localStorage.getItem("authToken");

  const getProfileData = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
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
      return (
        <div className="loader-container">
          <PacmanLoader color="#05ffe9" size={100} />
        </div>
      );
    }

    return (
      <Container>
        <h1>Hi {profileData.user.name}!</h1>

        <Row>
          <Col>
            <UserProfileCard
              profileData={profileData}
              refreshProfile={getProfileData}
            />
          </Col>
          <Col>
            <Card
              bg="dark"
              text="white"
              className="card-with-spacing bright-shadow"
            >
              <Card.Body>
                <h2>Your current games</h2>
                {profileData.game.map((userGame) => (
                  <div key={userGame.demo}>
                    <Link to={`/games/${userGame._id}`}>
                      <Card
                        bg="dark"
                        text="white"
                        className="card-with-spacing bright-shadow"
                      >
                        <Card.Img
                          style={{
                            width: "100%",
                            height: "170px",
                            objectFit: "cover",
                          }}
                          variant="top"
                          src={userGame.image || defaultImage}
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
        </Row>
        <Row>
          <Col>
            <Card
              bg="dark"
              text="white"
              className="card-with-spacing bright-shadow"
            >
              <Card.Body>
                <h2>Your recent reviews</h2>
                {profileData.reviews.map((userReview) => (
                  <div key={userReview.title}>
                    <Link to={`/games/${userReview.game}`}>
                      <Card
                        bg="dark"
                        text="white"
                        className="card-with-spacing bright-shadow"
                      >
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
          <Col>
            <Card
              bg="dark"
              text="white"
              className="card-with-spacing bright-shadow"
            >
              <Card.Body>
                <h2>Your recently played games</h2>
                {profileData.reviews.map((userReview) =>
                  userReview.played === true ? (
                    <div key={userReview.title}>
                      <Link to={`/games/${userReview.game._id}`}>
                        <Card
                          bg="dark"
                          text="white"
                          className="card-with-spacing bright-shadow"
                        >
                          <Card.Body>
                            <Card.Img
                              style={{
                                width: "100%",
                                height: "170px",
                                objectFit: "cover",
                              }}
                              variant="top"
                              src={userReview.game.image || defaultImage}
                            />
                            <Card.Title>{userReview.game.title}</Card.Title>
                          </Card.Body>
                        </Card>
                      </Link>
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return <>{renderUser()}</>;
}

export default ProfilePage;
