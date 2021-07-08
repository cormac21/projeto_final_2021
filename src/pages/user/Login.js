import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import {useRef, useState} from "react";
import { useAuth } from '../../contexto/AuthContext'
import {Link, useHistory } from "react-router-dom";

export default function LoginPage(props) {

  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  let history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false)
      history.push("/")
    } catch (e) {
      setError("Erro ao fazer o login do usuário!")
      setLoading(false)
    }

  }

  return (
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        <div className="w-100" style={{maxWidth: "400px"}}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              {error && <Alert variant="danger">{error}</Alert> }
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label> Email: </Form.Label>
                  <Form.Control type="email" ref={emailRef} required></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label> Senha: </Form.Label>
                  <Form.Control type="password" ref={passwordRef} required></Form.Control>
                </Form.Group>
                <Button className="w-100" type="submit" disabled={loading}>Login</Button>
              </Form>
              <div className="w-100 text-center mt-3" >
                <Link to="/forgot-password" > Forgot password?</Link>
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