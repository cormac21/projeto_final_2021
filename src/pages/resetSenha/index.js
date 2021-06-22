import React, {Component} from 'react'
import {Helmet} from "react-helmet";
import firebase from '../../conexaodb'
import './resetSenha.css';
import {Alert, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Link} from 'react-router-dom';

class ResetSenha extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            usuario: "",
            error: "",
            message: "",
            loading: false
        };

        this.resetarSenha = this.resetarSenha.bind(this);
    }

    resetarSenha(e) {
        e.preventDefault()

        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then((sucess) => {
                alert("Email de reset de senha mandado com sucesso!");
                this.props.history.replace("/");
            }).catch((error) => {

            })
    }

    render() {
        return (
            <div>
                
                {/* Titulo da página */}
                <Helmet>
                    <title>Reset de senha</title>
                </Helmet>

                {/* Conteúdo */}
                <div className="container resetSenha">
                    <div className="row childResetSenha">
                        <div className="col align-self-center contentResetSenha">
                            <h2 className="titleResetSenha" style={{paddingBottom: ".4em"}}>Esqueci minha senha</h2>

                            <p style={{marginLeft:"5em" , marginRight: "5em", marginBottom: "2em"}}>
                                Insira o email do seu cadastro e enviaremos um link para você trocar a senha e voltar a acessar sua conta.
                            </p>
                            
                            {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                            {this.state.message && <Alert variant="success">{this.state.message}</Alert>}
                            
                            
                            <form onSubmit={this.resetarSenha}>
                                <div className="form-group input-group form-resetSenha">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i class="fas fa-envelope"></i>
                                        </div>
                                    </div>
                                    <input autoFocus type="email" placeholder="E-mail" className="form-control form-control-md"
                                    value={this.state.email} onChange={ (e) => this.setState({email: e.target.value})}/>
                                </div>
                                
                                <Button disabled={this.state.loading} className="btn btn-md btn-resetSenha" type="submit">
                                    Trocar senha
                                </Button>
                            </form>

                            <br></br>
                            <Link to="/" style={{textDecoration: "none"}}>
                                <button className="btn btn-md btn-resetSenha"> Voltar </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetSenha;