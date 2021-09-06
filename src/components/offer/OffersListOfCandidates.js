import { useState} from 'react'
import firebase from '../../firebase'
import {useOfferContext} from "../../contexto/OfferContext";

export default function OffersListOfCandidates(props) {

    const {offer} = useOfferContext()
    const [isOwner, setIsOwner] = useState(offer.isOwner)
    const [offerId, setOfferId] = useState(offer.id)
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState(null)
    let [selectedCandidate, setSelectedCandidate] = useState("")
    let [selectedCandidateName, setSelectedCandidateName] = useState("")
    let [candidateIdList, setCandidateIdList] = useState(offer.candidatos)
    let [list, setList] = useState([])
    const offersRef = firebase.firestore().collection("offers")
    const usersRef = firebase.firestore().collection("users")

    if (isOwner && candidateIdList != false) {
        carregarCandidatosDeOferta(offerId);
    }

    function handleSelecionarCandidato(e) {
        candidatoSelecionado: e.target.getAttribute('idusuario')
        nomeCandidatoSelecionado: e.target.getAttribute('nomeusuario')
        offersRef.child(offerId).update({
            candidatoSelecionado: selectedCandidate
        })
    }

    function handleDeselecionarCandidato(e) {
        selectedCandidate = e.target.getAttribute('idusuario')
        selectedCandidateName = e.target.getAttribute('nomeusuario')
        offersRef.child(offerId).update({
            candidatoSelecionado: false
        })
    }

    async function carregarCandidatosDeOferta(id) {
        try {
            setLoading(true)
            if (Array.isArray(candidateIdList)) {
                setList([])
            }
        } catch (e) {
            console.log(e)
        }
        if (Array.isArray(candidateIdList)) {
            await candidateIdList.forEach((candidatos) => {
                usersRef.child(candidatos.val().usuario).once('value', (snapshot) => {
                    list.push({
                        id: candidatos.key,
                        usuario: snapshot.val().nome
                    })
                })
            })
        } else {
            await usersRef.child(Object.values(candidateIdList)[0].usuario).once('value', (snapshot) => {
                list = []
                list.push({
                    id: Object.values(candidateIdList)[0].usuario,
                    usuario: snapshot.val().nome
                })
            })
        }
    }

    if (isOwner) {
        if (list.length > 0) {
            return (
                <div>
                    <h2> Candidatos </h2>
                    {
                        list.map((child) => {
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
        } else if (selectedCandidate != null && selectedCandidate != undefined && selectedCandidate != "") {
            return (
                <div>
                    <h2> Candidatos </h2>
                    <div>
                        <li>{selectedCandidateName}
                            <button onClick={handleDeselecionarCandidato}
                                    idusuario={selectedCandidate}
                                    nomeusuario={selectedCandidateName}> Deselecionar
                            </button>
                        </li>

                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h2> Candidatos </h2>
                    <p> Não há nenhum candidato para esta oferta! </p>
                </div>
            )
        }
    } else {
        return null;
    }

}