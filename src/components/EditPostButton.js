import {useContext, useState} from 'react'
import {useHistory} from "react-router-dom";
import ContextoDePublicacao from "../contexto/ContextoDePublicacao";

export default function EditPostButton() {

    const publicacao = useContext(ContextoDePublicacao)
    const publicacaoId = useState(publicacao.id)
    const categoria = useState(publicacao.categoria)
    const ehDono = useState(publicacao.ehDono)
    let history = useHistory()

    function editPostRedirect() {
        history.push("/editarPublicacao/" + publicacaoId + "?categoria=" + categoria)
    }

    if (ehDono) {
        return <div style={{alignContent: "center"}}>
            <button
                onClick={editPostRedirect}> Editar
            </button>
        </div>
    } else {
        return <div/>
    }

}
