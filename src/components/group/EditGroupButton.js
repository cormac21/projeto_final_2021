import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";

export default function EditGroupButton(props) {

    const groupId = props.groupId
    const isOwner = props.isOwner
    let history = useHistory()

    function editGroupRedirect() {
        history.push('/edit_group/'.concat(groupId))
    }

    if ( isOwner ) {
        return (
            <Button onClick={editGroupRedirect}> Editar </Button>
        )
    } else {
        return null;
    }

}