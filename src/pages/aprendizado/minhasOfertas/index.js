import React, {Component} from 'react';
import firebase from '../../../firebase.js';
//import {Link, Redirect} from 'react-router-dom';
import '../publicacoes/publicacoes.css';
import {Helmet} from 'react-helmet';
import Footer from '../../../Footer';
import ListaDeCandidatos from "../../../components/ListaDeCandidatos";
import EditarPublicacao from "../editarPublicacao";
import OfertaView from "../../../components/OfertaView"
import BannerNenhumaOferta from "../../../components/BannerNenhumaOferta"

class MinhasOfertas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            loading: true,
            usuario: '',
            nome: '',
            url: '',
            //comentario: '',
            lista: [],
            listaCategorias: [],
            listaUsuarios: [],
            estahEditando: false

        };
        this.carregarOfertasDoUsuario = this.carregarOfertasDoUsuario.bind(this);

        this.getTodasCategorias();
        this.getTodosUsuarios();

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user: user}, () => {
                    this.carregarOfertasDoUsuario()
                });
            }
        });
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
                this.setState(state)
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

    carregarOfertasDoUsuario() {
        firebase.database().ref('ofertas').orderByChild('usuario')
            .equalTo(this.state.user.uid).on("value", (snapshot) => {
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
                    idade: child.val().idade,
                    candidatos: child.val().candidatos
                })
            });
            this.setState(state);
        });
    }

    render() {
        if (this.state.lista.length == 0) {
            return (
                <div className="page-container">
                    {/* Titulo da página */}
                    <Helmet>
                        <title>Minhas Ofertas</title>
                    </Helmet>
                    {/*Centro publicações*/}
                    <div className="p-2 bd-highlight feedPublicacoesConhecimento content-wrap">
                        <h2 style={{color: "#3F4596", paddingTop: "1em", textAlign: "center"}}> Minhas Ofertas de Ajuda </h2>
                        <BannerNenhumaOferta />
                    </div>
                    {/* <Footer></Footer> */}
                </div>
            )
        } else {
            return (
                <div className="page-container">
                    {/* Titulo da página */}
                    <Helmet>
                        <title>Minhas Ofertas</title>
                    </Helmet>
                    {/*Centro publicações*/}
                    <div className="p-2 bd-highlight feedPublicacoesConhecimento content-wrap">
                        <h2 style={{color: "#3F4596", paddingTop: "1em", textAlign: "center"}}> Minhas Ofertas de Ajuda </h2>
                        {
                            this.state.lista.map((child) => {
                                let categoria = this.state.listaCategorias.filter((categoria) => child.categoria === categoria.id)[0]
                                let usuario = this.state.listaUsuarios.filter((usuario) => child.usuario === usuario.id)[0]
                                let ehDono = false
                                if (child.usuario === this.state.user.uid) {
                                    ehDono = true;
                                }
                                return (
                                    <OfertaView ofertas={child}
                                                    ofertasCategoria={categoria.nome}
                                                    ofertasUsuario={usuario.nome} ehDono={ehDono}
                                                    history={this.props.history}></OfertaView>
                                )
                            })}
                    </div>
                    {/* <Footer></Footer> */}
                </div>
            )
        }
    }

}

export default MinhasOfertas;
