import React, {Component} from 'react';
import firebase from '../conexaodb'

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
