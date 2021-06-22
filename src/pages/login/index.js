import React, {Component} from 'react';
//import logo from '../../img/logo.png';
import './login.css';
import {Link} from 'react-router-dom';
import firebase from '../../conexaodb.js';
import { Helmet } from 'react-helmet';
//import FacebookLogin from "react-facebook-login";
//import 'bootstrap/dist/css/bootstrap.min.css';


class telaInicial extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: null,
      email: "",
      senha: "",
      imagem:""
    };

    this.logar = this.logar.bind(this);
  }

  /*responseFacebook = (resposta) =>{
    this.setState({
      nome: resposta.name,
      email: resposta.email,
      imagem: resposta.picture.data.url
    });
  }*/

  logar(e) {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
    .then(()=>{
        this.props.history.replace("/dashboard");
    })
    .catch((error) => {
      alert("Email ou senha inválidos");
    })
 
    e.preventDefault();
  }

  render(){

    return (
      <div style={{overflow: "hidden"}}>
        {/* Titulo da página */}
        <Helmet>
          <title>Login</title>
        </Helmet>

        {/* Conteúdo */}
        <div className="container index">
          <div className="row childLogin">
            <div className="col align-self-center contentLogin">
              <h2 className="titleLogin">Login</h2>


                <form onSubmit={this.logar} style={{marginTop: "3em"}}>

                  <div className="form-group input-group form-login">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i class="fas fa-envelope"></i>
                      </div>
                    </div>
                    <input autoFocus type="email" placeholder='E-mail' id="loginEmail" className="form-control"
                      value={this.state.email} onChange={ (e) => this.setState({email: e.target.value})}/>
                  </div> <br />

                  <div className="form-group input-group form-login">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i class="fas fa-lock"></i>
                      </div>
                    </div>
                    <input type="password" placeholder='Senha' id="loginSenha" className="form-control"
                      value={this.state.senha} onChange={ (e) => this.setState({senha: e.target.value})}/>
                  </div> <br />

                  <button type='submit' className="btn btn-md btn-entrar">Entrar</button> <br /> <br />
                  

                  <div className="w-100 text-center mt-2">
                    <p>
                      Precisa de uma conta? <br />
                      <Link className="textBottomText" to="/cadastro"> Cadastre-se aqui </Link>
                    </p>
                  </div>

                  <div className="w-100 text-center mt-2">
                    <Link className="textBottomText" to="/resetSenha">Esqueceu sua senha?</Link>
                  </div>

                </form>


              </div>
          </div>
        </div>
      </div>
    ); 
  }
}

export default telaInicial;
