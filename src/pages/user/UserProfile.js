import React, {useRef, useState} from 'react';
import firebase from '../../firebase.js'
import {useAuth} from "../../contexto/AuthContext";
import {Alert, Button, Card, Container, Form} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {useHistory} from "react-router-dom";

export default function UserProfile() {

    const {currentUser} = useAuth()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState(currentUser.email)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [profilePicture, setProfilePicture] = useState()
    const [dateOfBirth, setDateOfBirth] = useState()
    const history = useHistory()
    const [username, setUsername] = useState("")
    const usernameRef = useRef()

    if (currentUser) {
        getUserDetails()
    }

    async function getUserDetails() {
        try {
            const usersRef = firebase.firestore().collection('users')
            const querySnapshot = await usersRef.where('email', '==', currentUser.email).get()
            if (querySnapshot.empty) {
                console.log("Não encontrei usuários com este email!")
                return;
            } else {
                querySnapshot.forEach(doc => {
                    setUsername(doc.data().username)
                    setProfilePicture(doc().data().profilePicture)
                    setDateOfBirth(doc().data().birthDate)
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function updateProfile() {

    }

    function redirectToChangePasswordPage() {
        history.push("/changePassword")
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4"> Atualizar Perfil </h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form onSubmit={updateProfile}>
                            <Form.Group id="username">
                                <Form.Label> Nome de Usuário: </Form.Label>
                                <Form.Control type="text" ref={usernameRef}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label> Data de nascimento: </Form.Label>
                                <br/>
                                <DatePicker selected={dateOfBirth}
                                            onChange={(date) => setDateOfBirth(date)}
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            dateFormat="yyyy/MM/dd"/>
                            </Form.Group>

                            <Button className="w-100" type="submit" disabled={loading}>Editar</Button>
                        </Form>
                        <br/>
                        <Button className="w-100" type="submit" onClick={redirectToChangePasswordPage}> Alteração de
                            senha </Button>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}
