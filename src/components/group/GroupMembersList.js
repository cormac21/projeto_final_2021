import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import RemoveGroupMemberButton from '../group/RemoveGroupMemberButton'

export default function GroupMembersList(props) {

    const groupId = props.groupId
    const [membersList, setMembersList] = useState([])

    useEffect(() => {

    },[membersList])

    function removedMemberCompleted( data ) {
        setMembersList([])
    }

    return (
        <>
            <Container>
                {
                    membersList.map(item => {
                        return (
                            <Row>
                                <Col>
                                    <p>{item.username}</p>
                                </Col>
                                <Col>
                                    <RemoveGroupMemberButton callback={removedMemberCompleted} />
                                </Col>
                            </Row>
                        )
                    })
                }


            </Container>
        </>
    )

}