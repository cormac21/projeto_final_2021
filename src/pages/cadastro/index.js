import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import {useRef, useState} from "react";
import { useAuth } from '../../contexto/AuthContext'
import firebase from '../../firebase'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function PaginaDeCadastroUsuario(props) {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const usernameRef = useRef()
    const birthdayRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const usersDb = firebase.firestore().collection('users')

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !==
            passwordConfirmRef.current.value) {
            return setError("As senhas não são iguais")
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            await usersDb.add({
                email: emailRef.current.value,
                username: usernameRef.current.value,
                birthDate: birthdayRef.current.value
            })
        } catch {
            setError("Falha ao tentar criar uma conta!")
        }

    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Cadastre-se</h2>
                        {error && <Alert variant="danger">{error}</Alert> }
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="username">
                                <Form.Label> Nome de Usuário: </Form.Label>
                                <Form.Control type="text" ref={usernameRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label> Data de nascimento: </Form.Label>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} ref={birthdayRef} />
                            </Form.Group>
                            <Form.Group id="email">
                                <Form.Label> Email: </Form.Label>
                                <Form.Control type="email" ref={emailRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label> Password: </Form.Label>
                                <Form.Control type="password" ref={passwordRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label> Repita sua senha: </Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                            </Form.Group>
                            <Button className="w-100" type="submit" disabled={loading}>Cadastrar</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Já tem uma conta? Login
                </div>
            </div>
        </Container>
    )
}