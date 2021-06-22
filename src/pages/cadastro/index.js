import {Form, Button, Card, Container} from 'react-bootstrap'
import {useRef} from "react";
import { useAuth } from '../../contexto/AuthContext'

export default function PaginaDeCadastroUsuario(props) {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()

    function handleSubmit( e ) {
        e.preventDefault()

        signup(emailRef.current.value, passwordRef.current.value)
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Cadastre-se</h2>
                        <Form>
                            <Form.Group id="email">
                                <Form.Label> Email </Form.Label>
                                <Form.Control type="email" ref={emailRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label> Password </Form.Label>
                                <Form.Control type="password" ref={passwordRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label> Password Confirmation </Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                            </Form.Group>
                            <Button className="w-100" type="submit">Cadastrar</Button>
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