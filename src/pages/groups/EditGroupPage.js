import {useAuth} from "../../context/AuthContext";
import {useEffect, useState} from "react";
import firebase from "../../firebase";
import {useHistory} from "react-router-dom";
import {Button, Card, Container, Form} from "react-bootstrap";
import GroupMembersList from "../../components/group/GroupMembersList";

export default function EditGroupPage(props) {

    const { currentUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const groupId = props.match.params.id
    const [groupName, setGroupName] = useState("")
    const [newMember, setNewMember] = useState("")
    const groupsRef = firebase.firestore().collection("groups")
    const usersRef = firebase.firestore().collection("users")
    let history = useHistory()

    useEffect(() => {
        try {
            setLoading(true)
            groupsRef.doc(groupId).get().then(snap => {
                setGroupName(snap.data().groupName)
            })
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }, [])

    async function handleEditCompleted(event) {
        try {

            history.replace("/grupos")
        } catch (e) {
            console.log(e)
        }
    }

    function changeGroupName(event) {
        setGroupName(event.target.current.value)
    }

    function updateNewMember(event) {
        setNewMember(event.target.current.value)
    }

    async function addNewMember() {
        try {
            setLoading(true)
            //lookup username
            const newMemberId = ''
            await groupsRef.doc(groupId).set({
                members: firebase.firestore.FieldValue.arrayUnion(newMemberId)
            })
            alert('Novo membro incluido com sucesso!')
            setLoading(false)
            history.go(0)
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
                            <h2 className="text-center mb-4">Editar Grupo</h2>
                            <Form onSubmit={handleEditCompleted}>
                                <Form.Group id="groupName">
                                    <Form.Label> Nome do grupo: </Form.Label>
                                    <Form.Control type="text" value={groupName} onChange={changeGroupName}></Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group id="addMember">
                                    <Form.Label> Adicione um membro: </Form.Label>
                                    <Form.Control type="text" value={newMember} onChange={updateNewMember}></Form.Control>
                                    <Button onClick={addNewMember}></Button>
                                </Form.Group>
                                <GroupMembersList />
                                <Button type="submit" style={{float: "right"}} disabled={loading} > Editar </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )


}