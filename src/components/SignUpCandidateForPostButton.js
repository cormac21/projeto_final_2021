import {useContext, useState} from "react";
import firebase from '../firebase'
import ContextoDePublicacao from "../contexto/ContextoDePublicacao";

export default function SignUpCandidateForPostButton(props) {

    const [user, setUser] = useState(null)
    const post = useContext(ContextoDePublicacao)
    const [postId, setPostId] = useState(post.id)
    const [isOwner, setIsOwner] = useState(post.ehDono)
    const refPosts = firebase.database().ref("publicacao/" + postId);

    firebase.auth().onAuthStateChanged((usuario) => {
        if (usuario) {
            setUser(usuario)
        }
    });

    function handleOnClick() {
        refPosts.child('candidatos').push({
            usuario: user.uid
        }).then(
            alert("Candidatura concluída com sucesso!")
        ).catch()
    }

    if (!isOwner) {
        return (
            <div className="input-group" style={{justifyContent: "center"}}>
                <button className="btn btn-help" onClick={handleOnClick}> Ajudar</button>
            </div>
        )
    } else {
        return null;
    }
}

