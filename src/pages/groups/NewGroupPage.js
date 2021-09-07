import {useRef, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {Button, Card, Container, Form} from "react-bootstrap";
import firebase from "../../firebase"
import {useHistory} from "react-router-dom";

export default function NewGroupPage(props) {

    const { currentUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const groupNameRef = useRef()
    const groupsRef = firebase.firestore().collection("groups")
    let history = useHistory()

    async function handleNewGroupSubmit(event) {
        event.preventDefault()
        setLoading(true)
        try {
            await groupsRef.add({
                groupName: groupNameRef.current.value,
                ownerId: currentUser.uid,
                createdOn: new Date().toISOString(),
                members: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
            })
            setLoading(false)
            alert('Grupo criado com sucesso!')
            history.push('/grupos')
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <>
            <div style={{minHeight: "100px"}}></div>
            <Container className="d-flex justify-content-center" style={{minHeight: "100vh"}}>
                <div className="w-100" style={{maxWidth: "600px"}}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Novo Grupo</h2>
                            <Form onSubmit={handleNewGroupSubmit}>
                                <Form.Group id="groupName">
                                    <Form.Label> Nome do grupo: </Form.Label>
                                    <Form.Control type="text" ref={groupNameRef} ></Form.Control>
                                </Form.Group>
                                <br/>
                                <Button type="submit" style={{float: "right"}} disabled={loading} > Criar </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )

}
