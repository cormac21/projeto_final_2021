import {useContext, useState} from 'react'
import EditPostButton from './EditPostButton'
import CandidateList from "./CandidateList";
import SignUpCandidateForPostButton from "./SignUpCandidateForPostButton";
import ContextoDePublicacao from "../contexto/ContextoDePublicacao";

export default function PostView(props) {

    const publicacao = useContext(ContextoDePublicacao)
    const [publicacaoId, setPublicacaoId] = useState(publicacao.id)
    const [titulo, setTitulo] = useState(publicacao.titulo)
    const [conhecimento, setConhecimento] = useState(publicacao.conhecimento)
    const [idade, setIdade] = useState(publicacao.idade)
    const [descricao, setDescricao] = useState(publicacao.descricao)
    const [categoria, setCategoria] = useState(publicacao.publicacaoCategoria)
    const [usuario, setUsuario] = useState(publicacao.publicacaoUsuario)

    return (
        <div>
            <div className="conteudo" style={{marginTop: "2em"}}>
                <div className="border border-secondary rounded"
                     style={{padding: "1.5em", backgroundColor: "#d1d7e0"}}>
                    <h4 data-id={publicacaoId}
                        style={{textAlignLast: "center"}}> {titulo} </h4>
                    <div className="row">
                        <div className="col">
                            <label> <b>Área: </b>{categoria.nome} </label><br/>
                            <label> <b>Conhecimento: </b>{conhecimento} </label>
                        </div>
                        <div className="col"
                             style={{textAlignLast: "right", fontWeight: "bold"}}>
                            <label> {usuario.nome} </label> <br/>
                            <label> Usuário: {idade} </label> <br/>
                        </div>
                    </div>
                    <br/>
                    <div style={{overflowWrap: "break-word"}}>
                        {descricao}
                    </div>
                    <br/>

                    <SignUpCandidateForPostButton/>
                    <EditPostButton/>
                    <hr/>
                    <CandidateList/>
                </div>
                <br/>
            </div>
        </div>
    )
}