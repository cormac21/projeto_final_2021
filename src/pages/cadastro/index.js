import React, {Component} from 'react';
import firebase from '../../conexaodb.js';
import './cadastro.css';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';

class telaInicial extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: "",
      senha: "",
      confSenha: "",
      usuario: "",
      nome: "",
      idade: "",
      dataNascimento: "",
      fotoPerfil: "",
      //estado: "login",
      loading: false
    };

    this.cadastrar = this.cadastrar.bind(this);
  }

  cadastrar(e){

      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
      .then((success) =>{
        // validar se o "usuario" não é igual a um existente
        firebase.database().ref('usuarios').child(success.user.uid).set({
          nome: this.state.nome,
          usuario: this.state.usuario,
          email: this.state.email,
          idade: this.state.idade,
          fotoPerfil: this.state.fotoPerfil,
          dataNascimento: this.state.dataNascimento,
          dataCriacao: new Date().toISOString()
        });
        alert("Cadastro realizado com Sucesso!");
        this.props.history.replace("/");
      })
      .catch((error) => {
        if(error.code === 'auth/invalid-email'){
          alert("Endereço de e-mail inválido")
        }
        if(error.code === 'auth/email-already-in-use'){
          alert("Endereço de e-mail já utilizado")
        }
        if(error.code === 'auth/auth/weak-password'){
          alert("Senha fraca")
        }
      })

      e.preventDefault();
  }

  render(){
    return (
      <div>
        {/* Titulo da página */}
          <Helmet>
            <title>Cadastro</title>
          </Helmet>

        {/* Conteúdo */}
        <div className="container cadastro">
          <div className="row childCadastro">
            <div className="col align-self-center contentCadastro">
              <h2 className="title-cadastro">Cadastro</h2><br></br>


              <form>
              
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i class="fas fa-user-alt"></i>
                  </div>
                </div>
                <input type="text" placeholder="Nome Completo" autoFocus className="form-control" value={this.state.nome}
                onChange={ (e) => this.setState({nome: e.target.value})}/>
              </div>

                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i class="fas fa-at"></i>
                    </div>
                  </div>
                  <input type="text" placeholder="Nome de Usuário" className="form-control" value={this.state.usuario}
                         onChange={(e) => this.setState({usuario: e.target.value})}/>
                </div>

                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-at"></i>
                    </div>
                  </div>
                  <input type="text" placeholder="Data de Nascimento" className="form-control"
                         value={this.state.dataNascimento}
                         onChange={(e) => this.setState({dataNascimento: e.target.value})}/>
                </div>

                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i class="fas fa-envelope"></i>
                    </div>
                  </div>
                  <input type="email" placeholder="E-mail" className="form-control" value={this.state.email}
                         onChange={(e) => this.setState({email: e.target.value})}/>
                </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i class="fas fa-lock"></i> 
                  </div>
                </div>
                <input type="password" placeholder="Senha" className="form-control" value={this.state.senha}
                onChange={ (e) => this.setState({senha: e.target.value})}/>
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i class="fas fa-lock"></i> 
                  </div>
                </div>
                <input type="password" placeholder="Confirmar Senha" className="form-control" value={this.state.confSenha}
                onChange={ (e) => this.setState({confSenha: e.target.value})}/>
              </div>

              <div className="row justify-content-md-center" style={{maginTop:"1em"}}>
                <p style={{marginLeft: "1em", marginRight: "1em"}}>De acordo com a separação dos nossos publicos, por favor selecione sua idade:</p>
                <div className="col-md-auto">
                  <p>
                    Jovem: Até 49 anos <br /> 
                    Maturi: A partir de 50 anos</p>
                </div>
                <div className="col-lg-2" style={{paddingTop: "10px"}}>
                  <select className="form-select" aria-label="Default select example" onChange={ (e) => this.setState({idade: e.target.value})} required>
                    <option defaultValue> Idade </option>
                    <option value="Jovem"> Jovem </option>
                    <option value="Maturi"> Maturi </option>
                  </select>
                </div>
              </div>
              
              <div style={{textAlign: "center" , marginTop: "0.5em"}}>
                <button type='submit' className="btn btn-md btn-cadastro" style={{textDecoration: "none", marginBottom: "1.5em"}} onClick={this.cadastrar}>Cadastrar</button>
                <br />
                <Link to="/" style={{textDecoration: "none"}}>
                  <button className="btn btn-md btn-cadastro"> Voltar </button>
                </Link>
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
