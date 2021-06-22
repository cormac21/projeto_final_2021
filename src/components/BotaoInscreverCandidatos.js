import {useContext, useState} from "react";
import firebase from '../conexaodb'
import ContextoDePublicacao from "../contexto/ContextoDePublicacao";

export default function BotaoInscreverCandidatos(props) {

    const [user, setUser] = useState(null)
    const publicacao = useContext(ContextoDePublicacao)
    const [publicacaoId, setPublicacaoId] = useState(publicacao.id)
    const [ehDono, setEhDono] = useState(publicacao.ehDono)
    const refPublicacao = firebase.database().ref("publicacao/" + publicacaoId);

    firebase.auth().onAuthStateChanged((usuario) => {
        if (usuario) {
            setUser(usuario)
        }
    });

    function handleOnClick() {
        refPublicacao.child('candidatos').push({
            usuario: user.uid
        }).then(
            alert("Candidatura concluída com sucesso!")
        ).catch()
    }

    if (!ehDono) {
        return (
            <div className="input-group" style={{justifyContent: "center"}}>
                <button className="btn btn-help" onClick={handleOnClick}> Ajudar</button>
            </div>
        )
    } else {
        return null;
    }
}

