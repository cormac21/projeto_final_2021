import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import firebase from '../../firebase'
import EditGroupButton from "./EditGroupButton";
import {useAuth} from "../../context/AuthContext";
import DeleteGroupButton from "./DeleteGroupButton";
import {GroupProvider} from "../../context/GroupContext";

export default function GroupsListComponent(props) {

    const {currentUser} = useAuth()
    const [groupList, setGroupList] = useState([])
    const groupsRef = firebase.firestore().collection('groups')

    useEffect(() => {
        console.log('get groups effect called')
        try {
            groupsRef.get().then(snapshot => {
                let tempList = []
                snapshot.forEach(item => {
                    tempList.push({
                        id: item.id,
                        groupName: item.data().groupName,
                        ownerId: item.data().ownerId,
                        createdOn: item.data().createdOn,
                        members: item.data().members
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
            <Container>
                {groupList.map((item) => {
                    if (item.ownerId === currentUser.uid) {
                        item.isOwner = true;
                    }
                    return (
                        <GroupProvider groupId={item.id} key={item.id}>
                            <Row >
                                <Col>
                                    <p>{item.groupName}</p>
                                    <p>{item.createdOn}</p>
                                </Col>
                                <Col xs lg="2">
                                    <EditGroupButton isOwner={item.isOwner} />
                                </Col>
                                <Col xs lg="2">
                                    <DeleteGroupButton isOwner={item.isOwner} />
                                </Col>
                            </Row>
                        </GroupProvider>
                    )
                })}
            </Container>
        </>
    )

}
