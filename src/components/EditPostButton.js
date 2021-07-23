import {useContext, useState} from 'react'
import {useHistory} from "react-router-dom";
import ContextoDePublicacao from "../contexto/ContextoDePublicacao";

export default function EditPostButton() {

    const post = useContext(ContextoDePublicacao)
    const postId = useState(post.id)
    const category = useState(post.categoria)
    const isOwner = useState(post.ehDono)
    let history = useHistory()

    function editPostRedirect() {
        history.push("/editarPublicacao/" + postId + "?categoria=" + category)
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
