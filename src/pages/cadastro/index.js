import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import {useRef, useState} from "react";
import { useAuth } from '../../contexto/AuthContext'
import firebase from '../../firebase'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {useHistory} from "react-router-dom";

export default function PaginaDeCadastroUsuario(props) {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const usernameRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [startDate, setStartDate] = useState("");
    const usersDb = firebase.firestore().collection('users')
    let history = useHistory()

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
                birthDate: startDate,
                createdDate: new Date()
            })
            setLoading(false)
            setMessage("Conta criada com sucesso!")
            history.replace("/")
        } catch(e) {
            setLoading(false)
            if( e.code == 'auth/invalid-email') {
                setError("Falha ao criar uma conta: Endereço de email inválido!")
            } else if (e.code == 'auth/email-already-in-use') {
                setError("Falha ao criar uma conta: Endereço de email inválido!")
            } else if (e.code == 'auth/auth/weak-password') {
                setError("Falha ao criar uma conta: Senha fraca!")
            }

        }

    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Cadastre-se</h2>
                        {error && <Alert variant="danger">{error}</Alert> }
                        {message && <Alert variant="success">{message}</Alert> }
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="username">
                                <Form.Label> Nome de Usuário: </Form.Label>
                                <Form.Control type="text" ref={usernameRef} required></Form.Control>
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
                                            dateFormat="yyyy/MM/dd" />
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