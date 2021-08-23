import {Button, Container} from "react-bootstrap";
import {useAuth} from "../../contexto/AuthContext";
import {useState} from "react";
import {useHistory} from "react-router-dom";


export default function GroupsListPage(props) {

    const { currentUser } = useAuth()
    const [groupList, setGroupList] = useState([])
    let history = useHistory()

    function newGroupClick(event) {
        event.preventDefault()
        history.push("/newGroup")
    }

    return (
        <>
            <div style={{minHeight: "100px"}}></div>
            <Container className="d-flex justify-content-center" style={{minHeight: "100vh"}}>
                <div className="w-100" style={{maxWidth: "600px"}}>

                </div>
                <Button onClick={newGroupClick}>Novo Grupo</Button>
            </Container>
        </>
    )

}