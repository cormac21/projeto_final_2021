import React, {Component} from 'react';
import firebase from '../../../firebase.js';
//import {Link, Redirect} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import Footer from '../../../Footer';
import SeletorDeCategoria from "../../../components/CategorySelector";
import BotaoInscreverCandidatos from "../../../components/SignUpCandidateForPostButton"
import OfferView from "../../../components/OfferView";

class OfertasAjuda extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            loading: true,
            usuario: '',
            nome: '',
            url: '',
            idade: '',
            categoria: '',
            nomeCategoria: '',
            lista: [],
            listaCategorias: [],
            listaUsuarios: []
        };

        this.getOfertasPorIdade = this.getOfertasPorIdade.bind(this);
        this.getOfertasPorCategoria = this.getOfertasPorCategoria.bind(this);
        this.updateValorSelecionado = this.updateValorSelecionado.bind(this);
        this.getTodasOfertas = this.getTodasOfertas.bind(this);
        this.getTodasCategorias = this.getTodasCategorias.bind(this);
        this.getTodosUsuarios = this.getTodosUsuarios.bind(this);
        this.getTodasCategorias();
        this.getTodosUsuarios();
        this.getTodasOfertas();

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user: user});
                firebase.database().ref('usuarios').child(user.uid).on('value', (snapshot) => {
                    this.setState({loading: false, usuario: snapshot.val().usuario, nome: snapshot.val().nome})
                });
            }
        });
    }

    updateValorSelecionado(e) {
        this.setState({idade: e.target.value, lista: []}, () => {
            if (this.state.idade == undefined || this.state.idade.trim() == "") {
                this.getTodasOfertas();
            } else {
                this.getOfertasPorIdade();
            }
        });
    }

    callbackDoSeletorDeCategoria = (dados) => {
        this.setState({
            categoria: dados.id,
            nomeCategoria: dados.nome
        }, () => {
            if (this.state.nomeCategoria === "") {
                this.getTodasOfertas();
            }
            this.getOfertasPorCategoria();
        })
    }

    getTodasCategorias() {
        var refCategorias = firebase.database().ref("categorias");
        refCategorias.once("value", (result) => {
            result.forEach((child) => {
                let state = this.state;
                state.listaCategorias.push({
                    id: child.key,
                    nome: child.val().nome
                })
                this.setState(state);
            })
        })
    }

    getTodosUsuarios() {
        var refUsuarios = firebase.database().ref("usuarios");
        refUsuarios.once("value", (result) => {
            result.forEach((child) => {
                let state = this.state;
                state.listaUsuarios.push({
                    id: child.key,
                    nome: child.val().usuario
                })
                this.setState(state)
            })
        })
    }

    getTodasOfertas() {
        var refOferta = firebase.database().ref("ofertas");
        refOferta.once("value", (result) => {
            let state = this.state;
            state.lista = [];

            result.forEach((child) => {
                state.lista.push({
                    id: child.key,
                    titulo: child.val().titulo,
                    descricao: child.val().descricao,
                    //url: child.val().imagem,
                    conhecimento: child.val().conhecimento,
                    categoria: child.val().categoria,
                    usuario: child.val().usuario,
                    idade: child.val().idade
                })
            });
            this.setState(state)
        });
    }


    getOfertasPorCategoria() {
        var refOferta = firebase.database().ref("ofertas");
        refOferta.orderByChild('categoria').equalTo(this.state.categoria).once("value", (result) => {
            let state = this.state;
            state.lista = [];
            result.forEach((child) => {
                state.lista.push({
                    id: child.key,
                    titulo: child.val().titulo,
                    descricao: child.val().descricao,
                    //url: child.val().imagem,
                    conhecimento: child.val().conhecimento,
                    categoria: child.val().categoria,
                    usuario: child.val().usuario,
                    idade: child.val().idade
                })
            });
            this.setState(state);
        });
    }

    getOfertasPorIdade() {
        var ref = firebase.database().ref("oferta");
        ref.orderByChild('idade').equalTo(this.state.idade).on("value", (snapshot) => {
            let state = this.state;
            state.lista = [];

            snapshot.forEach((child) => {
                state.lista.push({
                    id: child.key,
                    titulo: child.val().titulo,
                    descricao: child.val().descricao,
                    //url: child.val().imagem,
                    conhecimento: child.val().conhecimento,
                    categoria: child.val().categoria,
                    usuario: child.val().usuario,
                    idade: child.val().idade
                })
            });
            this.setState(state);
        });
    }

    render() {

        return (
            <div className="page-container">
                {/* Titulo da página */}
                <Helmet>
                    <title>Ofertas de ajuda</title>
                </Helmet>

                {/* Conteúdo */}
                <div className="p-2 bd-highlight feedPublicacoesConhecimento content-wrap">
                    <h2 style={{color: "#3F4596", paddingTop: "1em", textAlign: "center"}}> Ofertas de Ajuda </h2>
                    
                    {/* Filtros */}

                    <div className="row" style={{marginTop: "2em"  , paddingLeft: "20vw", marginRight: "auto"}}> 
                        <div className="col">
                            <label> Selecione o público que fez a oferta </label> <br />
                            <select id="selectIdade" className="form-select" aria-label="Default select example"
                                    onChange={this.updateValorSelecionado}>
                                <option value="" selected> Selecione </option>
                                <option value="Maturi"> Maturi </option>
                                <option value="Jovem"> Jovem </option>
                            </select>
                        </div>
                        <div className="col">
                            <label> Selecione a categoria da oferta </label> <br />
                            <SeletorDeCategoria callback={this.callbackDoSeletorDeCategoria}></SeletorDeCategoria>
                        </div>
                    </div>

                    {/* Carregamento das postagens */}
                    {this.state.lista.map((child) => {
                        let categoria = this.state.listaCategorias.filter((categoria) => child.categoria === categoria.id)[0]
                        let usuario = this.state.listaUsuarios.filter((usuario) => child.usuario === usuario.id)[0]
                        return (
                            <OfferView ofertas={child} ofertasCategoria={categoria.nome}
                                       ofertasUsuario={usuario.nome} />
                        )
                    })}

                </div>

                {/* <Footer></Footer> */}
            </div>
        )
    }

}

export default OfertasAjuda;
