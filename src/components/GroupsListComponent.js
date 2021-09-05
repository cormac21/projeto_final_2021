import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import firebase from '../firebase'
import EditGroupButton from "./EditGroupButton";
import {useAuth} from "../contexto/AuthContext";

export default function GroupsListComponent(props) {

    const { currentUser } = useAuth()
    const [groupList, setGroupList] = useState([])
    const groupsRef = firebase.firestore().collection('/groups')

    useEffect(async () => {
        try {
            const snapshot = await groupsRef.get();
            let tempList = []
            snapshot.forEach(item => {
                tempList.push({
                    id: item.data().uid,
                    groupName: item.data().groupName,
                    ownerId: item.data().ownerId,
                    createdOn: item.data().createdOn,
                    members: item.data().members
                })
            })
            setGroupList(tempList)
        } catch (e) {
            console.log(e)
        }
    }, [groupList])

    return (
        <>
            <Container>
                { groupList.map((item) => {
                    if (item.ownerId === currentUser.uid) {
                        item.isOwner = true;
                    }
                    return (
                        <Row key={item.uid}>
                            <Col>
                                <p>{item.groupName}</p>
                                <p>{item.createdOn}</p>
                            </Col>
                            <Col xs lg="2">
                                <EditGroupButton isOwner={item.isOwner} groupId={item.uid}/>
                            </Col>
                        </Row>
                    )
                })}
            </Container>
        </>
    )

}
