import { useState, useEffect, useContext } from "react"
import CoastersList from "../../components/CoastersList/CoastersList"
import Loader from "../../components/Loader/Loader"
import coastersService from "../../services/coasters.service"
import { Container, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { MessageContext } from '../../contexts/userMessage.context'
import { AuthContext } from '../../contexts/auth.context'

import NewCoasterForm from './../../components/NewCoasterForm/NewCoasterForm'

const CoastersListPage = () => {

    const [coasters, setCoasters] = useState()
    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const { setShowToast, setToastMessage } = useContext(MessageContext)
    const { user } = useContext(AuthContext)

    const loadCoasters = () => {
        coastersService
            .getCoasters()
            .then(({ data }) => setCoasters(data))
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {
        setShowToast(true)
        setToastMessage('Montaña creada en la BBDD')
        loadCoasters()
        closeModal()
    }

    useEffect(() => {
        loadCoasters()
    }, [])

    return (

        <>
            <Container>

                <h1>Galería de montañas rusas</h1>
                {user && <Button onClick={openModal} variant="dark" size="sm">Crear nueva</Button>}
                <hr />
                {!coasters ? <Loader /> : <CoastersList coasters={coasters} />}
                <hr />
                <Link to="/">
                    <Button variant="dark">Volver a inicio</Button>
                </Link>

            </Container>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva montaña rusa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewCoasterForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>

        </>
    )
}

export default CoastersListPage