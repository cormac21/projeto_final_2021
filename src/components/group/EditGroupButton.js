import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {useGroupContext} from "../../context/GroupContext";


export default function EditGroupButton(props) {

    const { group } = useGroupContext()
    const isOwner = props.isOwner
    let history = useHistory()

    function editGroupRedirect() {
        history.push('/edit_group/'.concat(group.id))
    }

    if ( isOwner ) {
        return (
            <Button onClick={editGroupRedirect}> Editar </Button>
        )
    } else {
        return null;
    }

}