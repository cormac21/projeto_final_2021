import React, {Component} from 'react';
import firebase from '../../firebase.js';
//import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';
//import Button from 'react-bootstrap/Button'
import './dashboard.css';
import Footer from '../../Footer'


class Dashboard extends Component{

  constructor(props){ 
    super(props);

    this.state = {
        user:null,
        loading: true,
        usuario: '',
        nome: '',
        //url: '',
        //comentario: '',
        //lista: []
    }; 

    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({user:user});
        firebase.database().ref('usuarios').child(user.uid).on('value', (snapshot) => {
          this.setState({loading:false, usuario:snapshot.val().usuario, nome:snapshot.val().nome})
        });

      }
    });
  }
  
  render(){

    return (
      <div className="page-container">

        {/* Titulo da página */}
          <Helmet>
            <title>Dashboard</title>
          </Helmet>

        {/* Conteúdo */}
        <div className="p-2 bd-highlight dashboard-middle dashboard content-wrap">
        
          <br />
          <h1 className="title-dashboard">MaturiJovem</h1>

          <p>O lugar onde os jovens e muturis se conectam para trocar experiências</p>

          <div className="container">
            <hr className="divider-title"></hr>
            <h3>O que você deseja fazer?</h3>
            <div className="row dahsboard-cards">

              <div className="col col-style col1-style">
                <h5 className="text-col">Conhecimentos Gerais</h5>
                <p className="text-col">Nessa sessão, você pode aprender algo novo ou até mesmo compartilhar um conhecimento seu, com outra pessoa. Venha compartilhar seus conhecimentos entre pessoas de várias idades na sessão de conhecimentos gerais.</p>
                <a href="/publicacoes" className="card-link align-self-end">Clique aqui</a>
              </div>
              
              <div className="col col-style col2-style">
                <h5 className="text-col">Trabalho</h5>
                <p className="text-col">Na sessão de trabalho, você pode compartilhar uma experiência profissional ou trocar uma ideia com quem está precisando de uma dica. Não perca a oportunidade de aumentar sua rede de contatos.</p>
                <a href="/dashboard" className="card-link">Clique aqui</a>
              </div>

              <div className="col col-style col3-style">
                <h5 className="text-col">Dia a Dia</h5>
                <p className="text-col">A sessão do dia a dia te traz mais perto de ua pessoa mais velha que possa estar preccisando de ajuda.  Se você é um Jovem, aproveite a oportunidade para ajudar alguém. Se for um Matur, poste sua necessidade e espere algum Jovem que possa ajudá-lo, ou até mesmo para uma boa companhia.</p>
                <a href="/dashboard" className="card-link">Clique aqui</a>
              </div>
            </div>

            <hr className="divider-end"></hr>
          </div>

        </div>

        {/* <Footer /> */}
      </div>
    ); 
  }
}

export default Dashboard;
