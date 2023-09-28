import { Card, Button } from "react-bootstrap"
import EditProfile from "./EditProfile"
import { useState } from "react"
import defaultImage from "../images/pacman-6450.gif";

function UserProfileCard (props) {
console.log(props);
    const [editMode, setEditMode] = useState(false)

    return (
      <Card bg="dark" text="white" className="card-with-spacing bright-shadow">
        <Card.Body>
          {editMode ? (
            <EditProfile
              {...props.profileData.user}
              setEditMode={setEditMode}
              refreshProfileData={props.refreshProfile}
            />
          ) : (
            <>
              <h1>Your Profile data:</h1>
              <br />
              <h2>Name: {props.profileData.user.name}</h2>
              <h2>Email: {props.profileData.user.email}</h2>

              <Card.Img
                style={{ width: "100%", height: "170px", objectFit: "cover" }}
                variant="top"
                src={props.profileData.user.image || defaultImage}
              />

              <Button
                variant="primary"
                onClick={() => {
                  setEditMode(true);
                }}
              >
                Edit
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    );

}

export default UserProfileCard