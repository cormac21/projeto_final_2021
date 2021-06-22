import React, {Component} from 'react';
import '../../dashboard/dashboard.css';
import { Helmet } from 'react-helmet';
//import {Link} from 'react-router-dom';
import firebase from '../../../firebase.js';
import '../publicacoes/publicacoes.css';
import Footer from '../../../Footer'
import SeletorDeCategoria from "../../../components/SeletorDeCategoria";

class novaPublicacao extends Component {
  constructor(props){
    super(props);

    this.state = {
      //imagem: null,
      user:null,
      usuario: '',
      nome: '',
      idade: '',

      loading: true,
      titulo: '',
      descricao: '',
      conhecimento: '',
      categoria: ''
    };

    this.publicar = this.publicar.bind(this);
    this.callbackDoSeletorDeCategoria = this.callbackDoSeletorDeCategoria.bind(this);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user: user});
        firebase.database().ref('usuarios').child(user.uid).on('value', (snapshot) => {
          this.setState({
            loading: false,
            usuario: snapshot.val().usuario,
            nome: snapshot.val().nome,
            idade: snapshot.val().idade
          })
        });
      }
    });

  }

  callbackDoSeletorDeCategoria = (dados) => {
    this.setState({
      categoria: dados.id
    })
  }

  publicar(e) {
    firebase.database().ref('publicacao').push({
      usuario: this.state.user.uid,
      titulo: this.state.titulo,
      descricao: this.state.descricao,
      conhecimento: this.state.conhecimento,
      categoria: this.state.categoria,
      idade: this.state.idade,
      dataCriacao: new Date().toISOString(),
      candidatos: false,
      ehAtivo: true
    })
    .then(() => {
      alert("Publicação salva");

      this.props.history.replace("/publicacoes");
    });
  }
  
  render() {
    return (
      <div className="page-container">

        {/* Titulo da página */}
          <Helmet title="Novo pedido de ajuda" />
        {/* Fim título da página */}

        {/* Criar publicação */}
          <div className="p-2 bd-highlight feedNovaPublicacao content-wrap">
            <div className="conteudoNovaPublicacao" style={{marginTop: "7vh"}}>
              <h3 style={{textAlign: "center", color: "#3F4596"}}>Criar Pedido de Ajuda</h3>

              <hr />

              <div className="form-group">
                <input type="text" placeholder="Titulo" id="tituloPubli" className="form-control form-control-md" onChange={ (e) => this.setState({titulo: e.target.value})} required/>
              </div>
              <div className="form-group">
                <textarea id="descricaoPubli" placeholder="Descrição" className="form-control form-control-md descricao" cols="40" rows="7" onChange={ (e) => this.setState({descricao: e.target.value})} required/>
              </div>


              <div className="container">
                <div className="row">
                    <div className="col center">
                      <label> Nível de Conhecimento </label> <br />
                      <select className="form-select left-select" aria-label="Default select example"
                              onChange={(e) => this.setState({conhecimento: e.target.value})} required>
                          <option defaultValue value=""></option>
                          <option value="Sem Conhecimento">Sem Conhecimento</option>
                          <option value="Baixo">Baixo</option>
                          <option value="Médio">Médio</option>
                          <option value="Alto">Alto</option>
                      </select>
                    </div>

                    <div className="col mb-4">
                      <label> Categoria </label> <br />
                      <SeletorDeCategoria callback={this.callbackDoSeletorDeCategoria}></SeletorDeCategoria>
                    </div>

                    </div>
                </div>

              <button type="button" className="btn btn-md btn-block btn-novoPedido" onClick={this.publicar} >Publicar</button>
              <hr/> <br/>
            </div>
          </div>
        {/* Fim criar publicação */}

        {/* <Footer /> */}
      </div>
    );
  }

}

export default novaPublicacao;