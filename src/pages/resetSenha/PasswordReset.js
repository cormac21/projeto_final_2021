import React, {Component, useRef, useState} from 'react'
import './resetSenha.css';
import {Alert, Form, Card, Container} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Link, useHistory} from 'react-router-dom';
import {useAuth} from "../../contexto/AuthContext";

export default function PasswordReset() {

    const emailRef = useRef()
    const [user, setUser] = useState()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const { resetPasswordAuth } = useAuth()

    async function resetPassword() {
        try{
            setError("")
            setLoading(true)
            await resetPasswordAuth.sendPasswordResetEmail(emailRef.current.value)
            setMessage('Olhe seus emails para prosseguir e resetar sua senha.')
        } catch {
            setError("Falha ao mandar email de reset de senha!")
        }
        setLoading(false)
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Body>

                        <h2 className="text-center mb-4">Password Reset</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form onSubmit={resetPassword}>
                            <Form.Group id="email">
                                <Form.Label> Email: </Form.Label>
                                <Form.Control type="email" ref={emailRef} required></Form.Control>
                            </Form.Group>
                            <Button className="w-100" type="submit" disabled={loading}>Reset Password</Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            Já é cadastrado? <Link to="/login"> Login</Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
                </div>
            </div>
        </Container>
    )
}