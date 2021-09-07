import {useGroupContext} from "../../context/GroupContext";
import {Button} from "react-bootstrap";
import firebase from '../../firebase'

export default function RemoveGroupMemberButton(props) {

    const { groupContext } = useGroupContext()
    const groupsRef = firebase.firestore().collection('groups')

    function handleRemoveMember() {
        try {
            groupsRef.doc(groupContext.id).set({
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