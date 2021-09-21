import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import firebase from '../../firebase'
import EditGroupButton from "./EditGroupButton";
import {useAuth} from "../../context/AuthContext";
import DeleteGroupButton from "./DeleteGroupButton";

export default function GroupsListComponent(props) {

    const {currentUser} = useAuth()
    const [groupList, setGroupList] = useState([])
    const groupsRef = firebase.firestore().collection('groups')

    useEffect(() => {
        try {
            groupsRef.get().then(snapshot => {
                let tempList = []
                snapshot.forEach(item => {
                    tempList.push({
                        uid: item.id,
                        groupName: item.data().groupName,
                        ownerId: item.data().ownerId,
                        createdOn: item.data().createdOn
                    })
                })
                setGroupList(tempList)
            });
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <>
            <Container className="vh-100 d-flex flex-column">
                {groupList.map((item) => {
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
                            <Col xs lg="2">
                                <DeleteGroupButton isOwner={item.isOwner} groupId={item.uid}/>
                            </Col>
                        </Row>
                    )
                })}
            </Container>
        </>
    )

}
