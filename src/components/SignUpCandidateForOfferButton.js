import React, {Component, useState} from 'react';
import firebase from '../firebase'
import {useAuth} from "../contexto/AuthContext";
import {usePostContext} from "../contexto/PostContext";
import {useOfferContext} from "../contexto/OfferContext";

export default function SignUpCandidateForOfferButton(props) {
    const { currentUser } = useAuth()
    const { offer } = useOfferContext()
    const [offerId, setOfferId] = useState(offer.id)
    const [isOwner, setIsOwner] = useState(offer.isOwner)
    const [isDisabled, setIsDisabled] = useState(false)
    const offersRef = firebase.firestore().collection("offers").doc(postId)

    function handleOnClick() {
        offersRef.update({
            candidates: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
        }).then(
            alert("Candidatura concluída com sucesso!")
        ).catch()
    }

    if (!isOwner) {
        return (
            <div className="input-group" style={{justifyContent: "center"}}>
                <button className="btn btn-help" disabled={isDisabled} onClick={handleOnClick}>   </button>
            </div>
        )
    } else {
        return null;
    }
}

class BotaoInscreverCandidatos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            ofertasId: this.props.ofertas
        }

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user: user});
            }
        });

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        const userUid = this.state.user.uid;
        const ref = firebase.database().ref("ofertas/" + this.state.ofertasId);
        ref.child('candidatos').push({
            usuario: userUid
        }).then(
            alert("Candidatura concluída com sucesso!")
        ).catch()

    }

    render() {
        return (
            <div className="input-group" style={{justifyContent: "center"}}>
                <button className="btn btn-help" onClick={this.handleOnClick}> Pedir Ajuda </button>
            </div>
        )
    }

}

export default BotaoInscreverCandidatos;
