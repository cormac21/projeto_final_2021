import {useRef} from "react";
import {useAuth} from "../../contexto/AuthContext";
import {Card, Container, Form} from "react-bootstrap";
import firebase from "../../firebase"

export default function NewGroupPage(props) {

    const { currentUser } = useAuth()
    const groupNameRef = useRef()
    const groupsRef = firebase.firestore().collection("groups")

    async function handleNewGroupSubmit(event) {
        try {
            await groupsRef.add({
                groupName: groupNameRef.current.value,
                ownerId: currentUser.uid,
                createdOn: new Date().toISOString()
            })

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
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )

}
