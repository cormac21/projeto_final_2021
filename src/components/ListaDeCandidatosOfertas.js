import {Component} from 'react'
import firebase from '../conexaodb'

class ListaDeCandidatosOfertas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            ofertasId: props.ofertasId,
            listaCandidatos: [],
            ehDono: props.ehDono
        }

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user: user})
            }
        });

        this.carregarCandidatosDeOferta(this.state.ofertasId);
    }

    carregarCandidatosDeOferta(ofertasId) {
        firebase.database().ref('ofertas').child(ofertasId).once('value', (result) => {
            result.child('candidatos').forEach((candidatos) => {
                firebase.database().ref('usuarios').child(candidatos.val().usuario).once('value', (snapshot) => {
                    let state = this.state;
                    state.listaCandidatos.push({
                        id: candidatos.key,
                        usuario: snapshot.val().nome
                    })
                    this.setState(state)
                })
            })
        });
    }

    render() {
        if (this.state.ehDono) {
            return (
                <div>
                    <h3> Pessoas necessidando ajuda </h3>
                    {
                        this.state.listaCandidatos.map((child) => {
                            return (
                                <li>{child.usuario}</li>
                            )
                        })
                    }
                </div>
            )
        } else {
            return null;
        }
    }
}

export default ListaDeCandidatosOfertas