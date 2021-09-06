import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import firebase from '../../firebase'

export default function DeleteGroupButton(props) {

    const groupId = props.groupId
    const isOwner = props.isOwner
    const groupsRef = firebase.firestore().collection('groups')
    let history = useHistory()

    async function deleteGroup() {
        try {
            await groupsRef.doc(groupId).delete();
            alert('Grupo excluido com sucesso!')
            history.go(0)
        } catch (e) {
            console.log(e)
        }
    }

    if ( isOwner ) {
        return (
            <Button variant="danger" onClick={deleteGroup}> Excluir </Button>
        )
    } else {
        return null;
    }

}