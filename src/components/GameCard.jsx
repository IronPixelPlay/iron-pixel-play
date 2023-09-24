import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function GameCard({ title, description, image, _id }) {
    return (
        <Card bg="dark" text="white" className="card-with-spacing bright-shadow">
            <Card.Img style={{ width: '100%', height: '170px', objectFit: 'cover' }} variant="top" src={image} />
            <Card.Body>
                <Card.Title>
                    {title}
                </Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <div className="d-flex justify-content-center">
                    <Link to={`/games/${_id}`} className="btn btn-primary">Visit the Game</Link>
                </div>
            </Card.Body>
        </Card>
    );
}

export default GameCard;
