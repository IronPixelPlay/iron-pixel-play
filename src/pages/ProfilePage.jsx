import React, { useEffect, useState } from "react";
import axios from "axios";

function ProfilePage() {
  const [user, setUser] = useState(null)

  const storedToken = localStorage.getItem('authToken'); 

  const getUser = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data)
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const renderList = () => {
    if (user === null) {
      return <h1>Loading</h1>;
    }

    return (
      <div>
        <h1>Hi {user.name}</h1>
      </div>
    );
  };

  return <>{renderList()}</>;
}
export default ProfilePage;