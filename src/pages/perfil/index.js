import React, { useRef, Component } from 'react';
import './perfil.css';
import firebase from '../../firebase.js'
import { Helmet } from 'react-helmet';
import {useHistory} from "react-router-dom";


export default function UpdateProfile() {

  const [loading, setLoading] = useState(false)
  const username = useRef()
  const [email, setEmail] = useState("")
  const [profilePicture, setProfilePicture] = useState()
  const [dateOfBirth, setDateOfBirth] = useState()
  const { currentUser } = useAuth()
  const usersRef = firebase.firestore().collection('users').where('email', '==', currentUser.email).get()

  async function updateProfile() {

  }

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
