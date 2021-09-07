import {useRef, useState} from 'react';
import firebase from '../../../firebase.js';
import {useAuth} from "../../../context/AuthContext";
import {useHistory} from "react-router-dom";
import {Alert, Button, Card, Container, Form} from "react-bootstrap";
import CategorySelector from "../../../components/category/CategorySelector";

export default function NewPost(props) {

    const {currentUser} = useAuth();
    const [username, setUsername] = useState("")
    const [userLevelOfMaturity, setUserLevelOfMaturity] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const titleRef = useRef()
    const descriptionRef = useRef()
    const [levelOfKnowledge, setLevelOfKnowledge] = useState("")
    const [category, setCategory] = useState("")
    const usersRef = firebase.firestore().collection("users");
    const postsRef = firebase.firestore().collection("posts");
    let history = useHistory()

    getUserDetails()

    async function getUserDetails() {
        try {
            const doc = await usersRef.doc(currentUser.uid).get();
            if (!doc.exists) {
                console.log("Não encontrei usuários com este email!")
                return;
            } else {
                setUsername(doc.data().username);
                setUserLevelOfMaturity(doc.data().levelOfMaturity)
                setLoading(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            setLoading(true)
            await postsRef.add({
                user: username,
                title: titleRef.current.value,
                description: descriptionRef.current.value,
                levelOfKnowledge: levelOfKnowledge,
                category: category,
                createdOn: new Date().toISOString(),
                levelOfMaturity: userLevelOfMaturity,
                candidates: false,
                active: true
            })
            alert("Publicação salva!")
            setLoading(false)
            history.push("/posts")
        } catch (e) {
            console.log(e)
        }
    }

    function categorySelectorCallback(data) {
        setCategory(data.id)
    }

    function handleKnowledgeChange(event) {
        setLevelOfKnowledge(event.target.options[event.target.selectedIndex].text)
    }

    return (
        <>
            <div style={{minHeight: "100px"}}></div>
            <Container className="d-flex justify-content-center" style={{minHeight: "100vh"}}>
                <div className="w-100" style={{maxWidth: "600px"}}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Criar Pedido de Ajuda</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="title">
                                    <Form.Label>Titulo</Form.Label>
                                    <Form.Control type="text" ref={titleRef} required/>
                                </Form.Group>
                                <br/>
                                <Form.Group id="description">
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control as="textarea" rows={3} ref={descriptionRef}/>
                                </Form.Group>
                                <br/>
                                <Form.Group id="levelOfKnowledge">
                                    <Form.Label>Nível de Conhecimento</Form.Label>
                                    <Form.Select value={levelOfKnowledge} onChange={handleKnowledgeChange}>
                                        <option value=""></option>
                                        <option value="Sem Conhecimento">Sem Conhecimento</option>
                                        <option value="Baixo">Baixo</option>
                                        <option value="Médio">Médio</option>
                                        <option value="Alto">Alto</option>
                                    </Form.Select>
                                </Form.Group>
                                <br/>
                                <Form.Group id="category">
                                    <Form.Label>Categoria</Form.Label>
                                    <CategorySelector callback={categorySelectorCallback}/>
                                </Form.Group>
                                <br/>
                                <Button className="w-100" type="submit" disabled={loading}>Novo Post</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    );
}
