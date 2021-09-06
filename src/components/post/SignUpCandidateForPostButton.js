import { useState} from "react";
import firebase from '../../firebase'
import {usePostContext} from "../../contexto/PostContext";
import {useAuth} from "../../contexto/AuthContext";

export default function SignUpCandidateForPostButton(props) {

    const { currentUser } = useAuth()
    const { post } = usePostContext()
    const [postId, setPostId] = useState(post.id)
    const [isOwner, setIsOwner] = useState(post.isOwner)
    const [isDisabled, setIsDisabled] = useState(false)
    const refPosts = firebase.firestore().collection("post").doc(postId)

    function handleOnClick() {
        refPosts.update({
            candidates: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
        }).then(
            alert("Candidatura concluída com sucesso!")
        ).catch()
    }

    if (!isOwner) {
        return (
            <div className="input-group" style={{justifyContent: "center"}}>
                <button className="btn btn-help" disabled={isDisabled} onClick={handleOnClick}> Ajudar </button>
            </div>
        )
    } else {
        return null;
    }
}

