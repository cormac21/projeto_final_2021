import {useRef} from "react";
import {useAuth} from "../../contexto/AuthContext";
import {Card, Container} from "react-bootstrap";


export default function NewGroupPage(props) {

    const { currentUser } = useAuth()
    const [groupName, setGroupName] = useRef()

    return(
        <>
            <div style={{minHeight: "100px"}}></div>
            <Container className="d-flex justify-content-center" style={{minHeight: "100vh"}}>
                <div className="w-100" style={{maxWidth: "600px"}}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Novo Grupo</h2>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )

}
