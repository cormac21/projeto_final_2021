import React, {Component} from "react";
import firebase from '../../../firebase.js';
import {Helmet} from "react-helmet";
//import Footer from "../../../Footer";
import '../publicacoes/publicacoes.css';
import SeletorDeCategoria from "../../../components/SeletorDeCategoria";
import ListaDeCandidatosOfertas from "../../../components/ListaDeCandidatosOfertas";

class EditarOfertas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            loading: true,
            idOfertas: props.match.params.id,
            idCategoria: ""
        }

        this.editarOferta = this.editarOferta.bind(this);
        this.callbackDoSeletorDeCategoria = this.callbackDoSeletorDeCategoria.bind(this);

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user: user}, (whatever) => {
                    firebase.database().ref('ofertas').child(this.state.idOfertas).once('value', (snapshot) => {
                        let state = this.state;
                        state.ofertas = snapshot.val();
                        state.titulo = snapshot.val().titulo;
                        state.descricao = snapshot.val().descricao;
                        state.conhecimento = snapshot.val().conhecimento;
                        state.categoria = snapshot.val().categoria;
                        state.idade = snapshot.val().idade;
                        state.candidatos = snapshot.val().candidatos;
                        this.setState(state);
                    })
                });
            }
        });
    }

    editarOferta() {
        firebase.database().ref('ofertas/' + this.state.idOfertas).update({
            usuario: this.state.user.uid,
            titulo: this.state.titulo,
            descricao: this.state.descricao,
            conhecimento: this.state.conhecimento,
            categoria: this.state.idCategoria,
            idade: this.state.idade,
            candidatos: this.state.candidatos
        }, () => {
            alert("Deu certo o update!!")
            this.props.callbackDoEditar({terminei: true})
        })
    }

    callbackDoSeletorDeCategoria = (dados) => {
        this.setState({
            categoria: dados.id
        })
    }

    render() {
        return (
            <div className="page-container">
                <Helmet title="Editar pedido de ajuda"/>
                <div className="p-2 bd-highlight editarPublicacao content-wrap">
                    <div className="conteudoEditarPublicacao" style={{marginTop: "7vh"}}>
                        <h3 style={{textAlign: "center", color: "#3F4596"}}>Editar Oferta de Ajuda</h3>
                        <hr/>

                        <div className="form-group">
                            <input type="text" placeholder="Titulo" id="tituloPubli"
                                   className="form-control form-control-md"
                                   value={this.state.titulo}
                                   onChange={(e) => this.setState({titulo: e.target.value})} required/>
                        </div>
                        <div className="form-group">
                            <textarea id="descricaoPubli" placeholder="Descrição"
                                      className="form-control descricao" cols="40" rows="7"
                                      value={this.state.descricao}
                                      onChange={(e) => this.setState({descricao: e.target.value})} required/>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col center">
                                    <label> Nível de Conhecimento </label> <br/>
                                    <select className="form-select left-select" aria-label="Default select example"
                                            value={this.state.conhecimento}
                                            onChange={(e) => this.setState({conhecimento: e.target.value})} required>
                                        <option defaultValue value=""></option>
                                        <option value="Alto">Alto</option>
                                        <option value="Médio">Médio</option>
                                        <option value="Baixo">Baixo</option>
                                        {/* <option value="Sem Conhecimento">Sem Conhecimento</option> */}
                                    </select>
                                </div>

                                <div className="col mb-4">
                                    <label> Categoria </label> <br/>
                                    <SeletorDeCategoria callback={this.callbackDoSeletorDeCategoria}
                                                        categoriaSelecionada={this.state.categoria}></SeletorDeCategoria>
                                </div>
                            </div>
                        </div>

                        <ListaDeCandidatosOfertas ofertasId={this.state.idOfertas} />
                        <br/>
                        <br/>
                        <button type="button" className="btn btn-block btn-novoPedido"
                                onClick={this.editarOferta}>Editar
                        </button>
                        <hr/>

                        <br/>
                    </div>
                </div>
                {/* <Footer/> */}
            </div>
        )
    }
}

export default EditarOfertas;