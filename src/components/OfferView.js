import { useState} from 'react'
import SignUpCandidateForPostButton from "./SignUpCandidateForPostButton";
import CandidateList from "./CandidateList";
import {useOfferContext} from "../contexto/OfferContext";
import EditOfferButton from "./EditOfferButton";

export default function OfferView(props) {
    const { offer } = useOfferContext()
    const [offerId, setOfferId] = useState(offer.id)
    const [title, setTitle] = useState(offer.titulo)
    const [levelOfKnowledge, setLevelOfKnowledge] = useState(offer.conhecimento)
    const [levelOfMaturity, setLevelOfMaturity] = useState(offer.idade)
    const [description, setDescription] = useState(offer.descricao)
    const [category, setCategory] = useState(offer.publicacaoCategoria)
    const [username, setUsername] = useState(offer.publicacaoUsuario)

    return (
        <div>
            <div className="conteudo" style={{marginTop: "2em"}}>
                <div className="border border-secondary rounded"
                     style={{padding: "1.5em", backgroundColor: "#d1d7e0"}}>
                    <h4 data-id={offerId}
                        style={{textAlignLast: "center"}}> {title} </h4>
                    <div className="row">
                        <div className="col">
                            <label> <b>Área: </b>{category.name} </label><br/>
                            <label> <b>Conhecimento: </b>{levelOfKnowledge} </label>
                        </div>
                        <div className="col"
                             style={{textAlignLast: "right", fontWeight: "bold"}}>
                            <label> {username.name} </label> <br/>
                            <label> Usuário: {levelOfMaturity} </label> <br/>
                        </div>
                    </div>
                    <br/>
                    <div style={{overflowWrap: "break-word"}}>
                        {description}
                    </div>
                    <br/>

                    <SignUpCandidateForPostButton/>
                    <EditOfferButton/>
                    <hr/>
                    <CandidateList/>
                </div>
                <br/>
            </div>
        </div>
    )

}