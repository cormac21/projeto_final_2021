import React, {useRef, useState} from 'react';
import firebase from '../../firebase.js'
import {useAuth} from "../../contexto/AuthContext";
import {Alert, Button, Card, Form} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {useHistory} from "react-router-dom";

export default function UserProfile() {

    const usersRef = firebase.firestore().collection('users').where('email', '==', currentUser.email).get()
    const [loading, setLoading] = useState(false)
    const username = useRef(usersRef.data())
    const [email, setEmail] = useState("")
    const [startDate, setStartDate] = useState()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [profilePicture, setProfilePicture] = useState()
    const [dateOfBirth, setDateOfBirth] = useState()
    const {currentUser} = useAuth()
    const history = useHistory()

    async function updateProfile() {

    }

    function redirectToChangePasswordPage() {
        history.push("/changePassword")
    }

    return (
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4"> Atualizar Perfil </h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={updateProfile}>
                    <Form.Group id="username">
                        <Form.Label> Nome de Usuário: </Form.Label>
                        <Form.Control type="text" ref={username}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Data de nascimento: </Form.Label>
                        <br/>
                        <DatePicker selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    dateFormat="yyyy/MM/dd"/>
                    </Form.Group>


                    <Button className="w-100" type="submit" disabled={loading}>Login</Button>
                </Form>
                <Button className="w-100" type="submit" onClick={redirectToChangePasswordPage}> Alteração de
                    senha </Button>
            </Card.Body>
        </Card>
    )
}
