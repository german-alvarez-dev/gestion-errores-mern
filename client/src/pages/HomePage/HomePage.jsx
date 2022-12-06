import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './HomePage.css'

const HomePage = () => {

    return (
        <Container className="Home">

            <Row>

                <Col md={{ span: 8, offset: 2 }}>

                    <h1>Coaster App!</h1>
                    <hr />
                    <p>La súper MERN de montañas rusas!</p>
                    <Link to="/galeria">
                        <Button variant="dark">Ir a la galería</Button>
                    </Link>

                </Col>

            </Row>

        </Container>
    )
}

export default HomePage