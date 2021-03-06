import { useState} from 'react'
import {useHistory} from "react-router-dom";
import {usePostContext} from "../../context/PostContext";

export default function EditPostButton() {

    const {post} = usePostContext()
    const postId = useState(post.id)
    const category = useState(post.category)
    const isOwner = useState(post.isOwner)
    let history = useHistory()

    function editPostRedirect() {
        history.push("/editPost/" + postId + "?categoria=" + category)
    }

    if (isOwner) {
        return <div style={{alignContent: "center"}}>
            <button
                onClick={editPostRedirect}> Editar
            </button>
        </div>
    } else {
        return <div/>
    }

}
