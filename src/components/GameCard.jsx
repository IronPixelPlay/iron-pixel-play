import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function GameCard({ title, description, image, _id }) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                {description}
                </Card.Text>
                <Button href={`/games/${_id}`} variant="primary">Visit the Game</Button>
            </Card.Body>
        </Card>
    );
}


export default GameCard;
