import { useState} from 'react'
import EditPostButton from './EditPostButton'
import CandidateList from "./CandidateList";
import SignUpCandidateForPostButton from "./SignUpCandidateForPostButton";
import {usePostContext} from "../contexto/PostContext";

export default function PostView(props) {

    const { post } = usePostContext()
    const [publicacaoId, setPublicacaoId] = useState(post.id)
    const [titulo, setTitulo] = useState(post.titulo)
    const [conhecimento, setConhecimento] = useState(post.conhecimento)
    const [idade, setIdade] = useState(post.idade)
    const [descricao, setDescricao] = useState(post.descricao)
    const [categoria, setCategoria] = useState(post.publicacaoCategoria)
    const [usuario, setUsuario] = useState(post.publicacaoUsuario)

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