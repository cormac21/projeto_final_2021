import {Button} from "react-bootstrap";
import firebase from '../../firebase'

export default function RemoveGroupMemberButton(props) {

    const groupId = props.groupId
    const groupsRef = firebase.firestore().collection('groups')

    function handleRemoveMember() {
        try {
            groupsRef.doc(groupId).set({
                members: firebase.firestore.FieldValue.arrayRemove()
            })
        } catch (e) {
            console.log(e)
        }
    }


    return(
        <Button variant="danger" onClick={handleRemoveMember}> Excluir Membro </Button>
    )

}