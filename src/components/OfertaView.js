import {Component} from 'react'
import firebase from '../conexaodb'
import BotaoEditarOfertas from '../components/BotaoEditarOferta'
import ListaDeCandidatosOfertas from "./ListaDeCandidatosOfertas";
import BotaoInscreverCandidatosOferta from "./BotaoInscreverCandidatoOferta";

class OfertaView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: "",
            ofertas: props.ofertas,
            ofertasId: props.ofertas.id,
            titulo: props.ofertas.titulo,
            ofertasCategoria: props.ofertas.categoria,
            conhecimento: props.ofertas.conhecimento,
            ofertasUsuario: props.ofertas.usuario,
            idade: props.ofertas.idade,
            descricao: props.ofertas.descricao,
            ehDono: props.ehDono,
            categoria: props.ofertasCategoria,
            usuario: props.ofertasUsuario
        }

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user: user})
            }
        });
    }

    render() {
        return (
            <div>
                <div className="conteudo" style={{marginTop: "2em"}}>
                    <div className="border border-secondary rounded"
                         style={{padding: "1.5em", backgroundColor: "#d1d7e0"}}>
                        <h4 data-id={this.state.ofertasId}
                            style={{textAlignLast: "center"}}> {this.state.titulo} </h4>
                        <div className="row">
                            <div className="col">
                                <label> <b>Área: </b>{this.state.categoria} </label><br/>
                                <label> <b>Conhecimento: </b>{this.state.conhecimento} </label>
                            </div>
                            <div className="col"
                                 style={{textAlignLast: "right", fontWeight: "bold"}}>
                                <label> {this.state.usuario} </label> <br/>
                                <label> Usuário: {this.state.idade} </label> <br/>
                            </div>
                        </div>
                        <br/>
                        <div style={{overflowWrap: "break-word"}}>
                            {this.state.descricao}
                        </div>
                        <br/>
                        <BotaoEditarOfertas ehDono={this.state.ehDono}
                                               ofertasId={this.state.ofertasId}
                                               history={this.props.history} />
                        {/* <BotaoInscreverCandidatosOferta /> */}
                        <hr/>
                        <ListaDeCandidatosOfertas ofertasId={this.state.ofertasId} ehDono={this.state.ehDono}/>
                    </div>
                    <br/>
                </div>
            </div>
        )
    }
}

export default OfertaView;