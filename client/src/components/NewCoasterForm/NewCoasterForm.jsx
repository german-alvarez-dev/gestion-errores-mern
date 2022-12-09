import { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import coastersService from "../../services/coasters.service"
import uploadServices from "../../services/upload.service"
import ErrorMessage from "../ErrorMessage/ErrorMessage"

const NewCoasterForm = ({ fireFinalActions }) => {

    const [coasterData, setCoasterData] = useState({
        title: '',
        description: '',
        length: 0,
        inversions: 0,
        imageUrl: ''
    })
    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])

    const handleInputChange = e => {
        const { name, value } = e.target
        setCoasterData({ ...coasterData, [name]: value })
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setCoasterData({ ...coasterData, imageUrl: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => console.log(err))
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        coastersService
            .saveCoaster(coasterData)
            .then(() => fireFinalActions())
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const { title, description, length, inversions, imageUrl } = coasterData

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" value={title} onChange={handleInputChange} name="title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="desc">
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="text" value={description} onChange={handleInputChange} name="description" />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="inv">
                        <Form.Label>Inversiones</Form.Label>
                        <Form.Control type="number" value={inversions} onChange={handleInputChange} name="inversions" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="len">
                        <Form.Label>Longitud</Form.Label>
                        <Form.Control type="number" value={length} onChange={handleInputChange} name="length" />
                    </Form.Group>
                </Col>
            </Row>

            {/* <Form.Group className="mb-3" controlId="image">
                <Form.Label>Imagen (URL)</Form.Label>
                <Form.Control type="url" value={imageUrl} onChange={handleInputChange} name="imageUrl" />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="image">
                <Form.Label>Imagen (URL)</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            {errors.length ? <ErrorMessage>{errors.map(elm => <p key={elm}>{elm}</p>)}</ErrorMessage> : undefined}

            <div className="d-grid">
                <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Subiendo imagen...' : 'Crear montaña rusa'}</Button>
            </div>
        </Form>
    )
}

export default NewCoasterForm
