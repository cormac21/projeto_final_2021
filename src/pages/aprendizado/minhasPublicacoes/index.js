import React, {Component} from 'react';
import firebase from '../../../firebase.js';
//import {Link, Redirect} from 'react-router-dom';
import '../publicacoes/publicacoes.css';
import {Helmet} from 'react-helmet';
import Footer from '../../../Footer';
import PublicacaoView from "../../../components/PublicacaoView"
import BannerNenhumaPublicacao from "../../../components/BannerNenhumaPublicacao"
import ContextoDePublicacao from "../../../contexto/ContextoDePublicacao";


class MinhasPublicacoes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            loading: true,
            //comentario: '',
            lista: [],
            listaCategorias: [],
            listaUsuarios: [],
            estahEditando: false

        };
        this.carregarPublicacoesDoUsuario = this.carregarPublicacoesDoUsuario.bind(this);

        this.getTodasCategorias();
        this.getTodosUsuarios();

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user: user}, () => {
                    this.carregarPublicacoesDoUsuario()
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

    carregarPublicacoesDoUsuario() {
        firebase.database().ref('publicacao').orderByChild('usuario')
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
                        <title>Minhas Publicações</title>
                    </Helmet>
                    {/*Centro publicações*/}
                    <div className="p-2 bd-highlight feedPublicacoesConhecimento content-wrap">
                        <h2 style={{color: "#3F4596", paddingTop: "1em", textAlign: "center"}}> Minhas Publicações </h2>
                        <BannerNenhumaPublicacao></BannerNenhumaPublicacao>
                    </div>
                    {/* <Footer></Footer> */}
                </div>
            )
        } else {
            return (
                <div className="page-container">
                    {/* Titulo da página */}
                    <Helmet>
                        <title>Minhas Publicações</title>
                    </Helmet>
                    {/*Centro publicações*/}
                    <div className="p-2 bd-highlight feedPublicacoesConhecimento content-wrap">
                        <h2 style={{color: "#3F4596", paddingTop: "1em", textAlign: "center"}}> Minhas Publicações </h2>
                        {
                            this.state.lista.map((child) => {
                                let categoria = this.state.listaCategorias.filter((categoria) => child.categoria === categoria.id)[0]
                                child.publicacaoCategoria = categoria
                                let usuario = this.state.listaUsuarios.filter((usuario) => child.usuario === usuario.id)[0]
                                child.publicacaoUsuario = usuario
                                let ehDono = false
                                if (child.usuario === this.state.user.uid) {
                                    ehDono = true;
                                }
                                child.ehDono = ehDono;
                                return (
                                    <ContextoDePublicacao.Provider value={child}>
                                        <PublicacaoView/>
                                    </ContextoDePublicacao.Provider>
                                )
                            })}
                    </div>
                    {/* <Footer></Footer> */}
                </div>
            )
        }
    }

}

export default MinhasPublicacoes;
