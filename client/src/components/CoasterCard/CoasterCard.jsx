import './CoasterCard.css'
import { Button, ButtonGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { AuthContext } from './../../contexts/auth.context'
import { Link } from 'react-router-dom'
import { useContext } from 'react';

function CoasterCard({ title, imageUrl, _id, owner }) {

    const { user } = useContext(AuthContext)

    return (


        <Card className="mb-4 CoasterCard">
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                {
                    !owner || owner != user?._id
                        ?
                        <>
                            <Link to={`/detalles/${_id}`}>
                                <div className="d-grid">
                                    <Button variant="dark" size="sm">Ver detalles</Button>
                                </div>
                            </Link>
                        </>
                        :
                        <>
                            <div className="d-grid">
                                <ButtonGroup aria-label="Basic example">
                                    <Link to={`/detalles/${_id}`}>
                                        <Button variant="dark" size="sm">Ver detalles</Button>
                                    </Link>
                                    <Button variant="warning" size="sm" onClick={() => alert('TE LKO CURRAS')}>Editar</Button>
                                </ButtonGroup>
                            </div>

                        </>

                }


            </Card.Body>
        </Card>
    );
}

export default CoasterCard;