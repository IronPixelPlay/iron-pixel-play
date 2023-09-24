import React, { useEffect, useState } from "react";
import axios from "axios";

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
      <div>
        <h1>Hi {profileData.user.name}</h1>

        <section>
          <h2>Your current games:</h2>
          {profileData.game.map((userGame) => (
            <div key={userGame.demo}>
              <a href={`/games/${userGame._id}`}>{userGame.title}</a>
            </div>
          ))}
        </section>

        <section>
          <h2>Your recent activity:</h2>
          {profileData.reviews.map((userReview) => (
            <div key={userReview.review}>
              <a href={`/games/${userReview.game}`}>{userReview.review}</a>
            </div>
          ))}
        </section>
      </div>
    );
  };



  return <>{renderUser()}</>;
}
export default ProfilePage;