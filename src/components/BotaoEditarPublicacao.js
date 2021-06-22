import {useContext, useState} from 'react'
import {useHistory} from "react-router-dom";
import ContextoDePublicacao from "../contexto/ContextoDePublicacao";

export default function BotaoEditarPublicacao(props) {

    const publicacao = useContext(ContextoDePublicacao)
    const [publicacaoId, setPublicacao] = useState(publicacao.id)
    const [categoria, setCategoria] = useState(publicacao.categoria)
    const [ehDono, setEhDono] = useState(publicacao.ehDono)
    let history = useHistory()

    function redirecionarParaEditar() {
        history.push("/editarPublicacao/" + publicacaoId + "?categoria=" + categoria)
    }

    if (ehDono) {
        return <div style={{alignContent: "center"}}>
            <button
                onClick={redirecionarParaEditar}> Editar
            </button>
        </div>
    } else {
        return <div/>
    }

}
