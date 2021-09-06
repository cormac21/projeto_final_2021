import {Button, Container} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import GroupsListComponent from "../../components/group/GroupsListComponent";


export default function GroupsListPage(props) {

    let history = useHistory()

    function newGroupClick(event) {
        event.preventDefault()
        history.push("/novo_grupo")
    }

    return (
        <>
            <div style={{minHeight: "100px"}}></div>
            <Container className="d-flex justify-content-center" style={{minHeight: "100vh"}}>
                <div className="w-100" style={{maxWidth: "600px"}}>
                    <Button onClick={newGroupClick} >Novo Grupo</Button>

                    <GroupsListComponent />
                </div>
            </Container>
        </>
    )

}