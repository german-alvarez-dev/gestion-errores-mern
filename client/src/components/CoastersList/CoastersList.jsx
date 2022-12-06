import { Col, Row } from "react-bootstrap"
import CoasterCard from "../CoasterCard/CoasterCard"

const CoastersList = ({ coasters }) => {

    return (
        <Row>
            {coasters.map(elm => {
                return (
                    <Col sm={{ span: 4 }} key={elm._id} >
                        <CoasterCard {...elm} />
                    </Col>
                )
            })}
        </Row>
    )
}

export default CoastersList