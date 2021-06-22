import React, {Component} from 'react';
import firebase from '../../../firebase.js';
//import {Link, Redirect} from 'react-router-dom';
import './publicacoes.css';
import {Helmet} from 'react-helmet';
import Footer from '../../../Footer';
import SeletorDeCategoria from "../../../components/SeletorDeCategoria";
import BotaoInscreverCandidatos from "../../../components/BotaoInscreverCandidatos"
import PublicacaoView from "../../../components/PublicacaoView";

class Publicacoes extends Component {

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

        this.getPublicacoesPorIdade = this.getPublicacoesPorIdade.bind(this);
        this.getPublicacoesPorCategoria = this.getPublicacoesPorCategoria.bind(this);
        this.updateValorSelecionado = this.updateValorSelecionado.bind(this);
        this.getTodasPublicacoes = this.getTodasPublicacoes.bind(this);
        this.getTodasCategorias = this.getTodasCategorias.bind(this);
        this.getTodosUsuarios = this.getTodosUsuarios.bind(this);
        this.getTodasCategorias();
        this.getTodosUsuarios();
        this.getTodasPublicacoes();

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
                this.getTodasPublicacoes();
            } else {
                this.getPublicacoesPorIdade();
            }
        });
    }

    callbackDoSeletorDeCategoria = (dados) => {
        this.setState({
            categoria: dados.id,
            nomeCategoria: dados.nome
        }, () => {
            if (this.state.nomeCategoria === "") {
                this.getTodasPublicacoes();
            }
            this.getPublicacoesPorCategoria();
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

    getTodasPublicacoes() {
        var refPublicacao = firebase.database().ref("publicacao");
        refPublicacao.once("value", (result) => {
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


    getPublicacoesPorCategoria() {
        var refPublicacao = firebase.database().ref("publicacao");
        refPublicacao.orderByChild('categoria').equalTo(this.state.categoria).once("value", (result) => {
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

    getPublicacoesPorIdade() {
        var ref = firebase.database().ref("publicacao");
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
                    <title>Publicações Conhecimento</title>
                </Helmet>

                {/* Conteúdo */}
                <div className="p-2 bd-highlight feedPublicacoesConhecimento content-wrap">
                    <h2 style={{color: "#3F4596", paddingTop: "1em", textAlign: "center"}}> Pedidos de Ajuda </h2>
                    
                    {/* Filtros */}

                    <div className="row" style={{marginTop: "2em"  , paddingLeft: "20vw", marginRight: "auto"}}> 
                        <div className="col">
                            <label> Selecione o tipo de pessoa que fez a publicação </label> <br />
                            <select id="selectIdade" className="form-select" aria-label="Default select example"
                                    onChange={this.updateValorSelecionado}>
                                <option value="" selected> Selecione </option>
                                <option value="Maturi"> Maturi </option>
                                <option value="Jovem"> Jovem </option>
                            </select>
                        </div>
                        <div className="col">
                            <label> Selecione a categoria da publicação </label> <br />
                            <SeletorDeCategoria callback={this.callbackDoSeletorDeCategoria}></SeletorDeCategoria>
                        </div>
                    </div>

                    {/* Carregamento das postagens */}
                    {this.state.lista.map((child) => {
                        let categoria = this.state.listaCategorias.filter((categoria) => child.categoria === categoria.id)[0]
                        let usuario = this.state.listaUsuarios.filter((usuario) => child.usuario === usuario.id)[0]
                        let ehDono = false
                        if (child.usuario === this.state.user.uid) {
                            ehDono = true;
                        }
                        return (
                            <PublicacaoView publicacao={child} publicacaoCategoria={categoria.nome}
                                            publicacaoUsuario={usuario.nome} ehDono={ehDono}></PublicacaoView>
                        )
                    })}

                </div>

                {/* <Footer></Footer> */}
            </div>
        )
    }

}

export default Publicacoes;
