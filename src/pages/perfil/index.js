import React, { useRef, Component } from 'react';
import './perfil.css';
//import {Link} from 'react-router-dom';
import firebase from '../../firebase.js'
//import {Card, Container, Form, FormLabel, Image, FormGroup, FormControl} from "react-bootstrap";
import { Helmet } from 'react-helmet';
import {useHistory} from "react-router-dom";


class Perfil extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loading: true,
      nome: props.nome,
      usuario: props.usuario,
      email: '',
      senha: '',
      imagem: null,
      idade: ''
      //url: ''
    }

    //this.salvarModificacoes = this.salvarModificacoes.bind(this);

    this.atualizarPefil = this.atualizarPefil.bind(this);
    //this.deletarUsuario = this.deletarUsuario.bind(this);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
        firebase.database().ref('usuarios').child(user.uid).on('value', (snapshot) => {
          this.setState({
            loading: false, usuario: snapshot.val().usuario, nome: snapshot.val().nome,
            email: snapshot.val().email, idade: snapshot.val().idade, fotoPerfil: snapshot.val().fotoPerfil
          })
        });
      }
    });

    
  }

  // Funções

  atualizarPefil(e) {
    let userRef = firebase.database().ref('usuarios/' + this.state.user.uid);

    userRef.update({
      nome: this.state.nome,
      usuario: this.state.usuario,
    }, () => {
      alert("Perfil editado.");
      this.props.history.replace("/dashboard");
    })    
    e.preventDefault();
  }

  /*
  deletarUsuario(e) {
    //let userRef = firebase.database().ref('usuarios/' + this.state.user.uid);
    //userRef.remove();
    let userRefAuth = firebase.database().ref('usuarios/' + this.state.user.id);
    userRefAuth.delete();

    e.preventDefault();

    alert('Usuário deletado');
    
    this.props.history.replace("/");
    //logout();
  } */

  render() {
    return (
      <div>
        {/* Título da página */}
        <Helmet>
          <title>Perfil Usuário</title>
        </Helmet>

        {/* Conteúdo */}
        <div className="container perfil">
          <div className="row childPerfil">
            <div className="col align-self-center contentPerfil">
              <h3 className="text-center mb-4 title-perfil"> Perfil </h3>

              <form>

                <label><strong>Nome completo</strong></label>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i class="fas fa-user-alt"></i>
                    </div>
                  </div>
                  <input type="text" placeholder="Nome Completo"
                    className="form-control"
                    value={this.state.nome}
                    onChange={(e) => this.setState({ nome: e.target.value })} />
                </div>

                <label><strong>Usuário</strong></label>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i class="fas fa-at"></i>
                    </div>
                  </div>
                  <input type="text" placeholder="Nome de Usuário" className="form-control" value={this.state.usuario}
                    onChange={(e) => this.setState({ usuario: e.target.value })} />
                </div>

                <text> <b>Tipo de usuário:</b> {this.state.idade} </text> <br />
                <text> <b>E-mail:</b> {this.state.email} </text> <br /><br />

                <div className="d-flex justify-content-center">

                  <button
                    type='submit'
                    className="btn btn-save-perfil"
                    style={{ textDecoration: "none" }}
                    onClick={this.atualizarPefil}>
                    Salvar Alterações
                  </button>

                </div> <br />

                {/* Botão para voltar a página
                <div className="d-flex justify-content-center">
                
                  <button
                    //type='submit'
                    className="btn btn-save-perfil"
                    style={{ textDecoration: "none" }}
                    onClick={this.props.history.goBack()}>
                    Voltar
                  </button>

                </div> */}


                {/* Botão para deletar perfil
                <div className="d-flex justify-content-center">

                  <button
                    type='submit'
                    className="btn btn-delete-perfil"
                    style={{ textDecoration: "none", marginRight: "20px" }}
                    onClick={this.deletarUsuario}>
                    Excluir perfil
                  </button>

                </div>*/}

              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Perfil;

function logout(props){
  //let history = useHistory()
  const callback = props.callback;

  firebase.auth().signOut().then(() => {
    
    //history.push( "/", {update: true})
    callback("logout");
    // e.preventDefault();
    }).catch ((error) => {
    // alert ("Não consegui dar logout!")
    alert(error.message)
  })

}
