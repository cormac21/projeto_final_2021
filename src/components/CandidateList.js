import { useState} from 'react'
import firebase from '../firebase'
import {usePostContext} from "../contexto/PostContext";

export default function CandidateList(props) {

    const {post} = usePostContext()
    const [isOwner, setIsOwner] = useState(post.ehDono)
    const [publicacaoId, setPublicacaoId] = useState(post.id)
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState(null)
    let [candidatoSelecionado, setCandidatoSelecionad] = useState("")
    let [nomeCandidatoSelecionado, setNomeCandidatoSelecionado] = useState("")
    let [listaDeIdsCandidatos, setListaDeIdsCandidatos] = useState(post.candidatos)
    let [listaDeCandidatos, setListaDeCandidatos] = useState([])
    const refPublicacao = firebase.database().ref('publicacao')
    const refUsuarios = firebase.database().ref('usuarios')

    if (isOwner && listaDeIdsCandidatos != false) {
        carregarCandidatosDePublicacao(publicacaoId);
    }

    function handleSelecionarCandidato(e) {
        candidatoSelecionado: e.target.getAttribute('idusuario')
        nomeCandidatoSelecionado: e.target.getAttribute('nomeusuario')
        refPublicacao.child(publicacaoId).update({
            candidatoSelecionado: candidatoSelecionado
        })
    }

    function handleDeselecionarCandidato(e) {
        candidatoSelecionado = e.target.getAttribute('idusuario')
        nomeCandidatoSelecionado = e.target.getAttribute('nomeusuario')
        refPublicacao.child(publicacaoId).update({
            candidatoSelecionado: false
        })
    }

    async function carregarCandidatosDePublicacao(publicacaoId) {
        setLoading(true)
        if (Array.isArray(listaDeIdsCandidatos)) {
            listaDeCandidatos = []
            await listaDeIdsCandidatos.forEach((candidatos) => {
                refUsuarios.child(candidatos.val().usuario).once('value', (snapshot) => {
                    listaDeCandidatos.push({
                        id: candidatos.key,
                        usuario: snapshot.val().nome
                    })
                })
            })
        } else {
            await refUsuarios.child(Object.values(listaDeIdsCandidatos)[0].usuario).once('value', (snapshot) => {
                listaDeCandidatos = []
                listaDeCandidatos.push({
                    id: Object.values(listaDeIdsCandidatos)[0].usuario,
                    usuario: snapshot.val().nome
                })
            })
        }
    }

    if (isOwner) {
        if (listaDeCandidatos.length > 0) {
            return (
                <div>
                    <h2> Candidatos </h2>
                    {
                        listaDeCandidatos.map((child) => {
                            return (
                                <div>
                                    <li>{child.usuario}</li>
                                    <button onClick={handleSelecionarCandidato} idusuario={child.id}
                                            nomeusuario={child.nome}> Selecionar
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else if (candidatoSelecionado != null && candidatoSelecionado != undefined && candidatoSelecionado != "") {
            return (
                <div>
                    <h2> Candidatos </h2>
                    <div>
                        <li>{nomeCandidatoSelecionado}
                            <button onClick={handleDeselecionarCandidato}
                                    idusuario={candidatoSelecionado}
                                    nomeusuario={nomeCandidatoSelecionado}> Deselecionar
                            </button>
                        </li>

                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h2> Candidatos </h2>
                    <p> Não há nenhum candidato para este post! </p>
                </div>
            )
        }
    } else {
        return null;
    }
}
