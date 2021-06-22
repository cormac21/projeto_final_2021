import React, {Component} from 'react';
import firebase from './conexaodb';
//import {Link, Redirect} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Footer from './Footer';


class Teste extends Component{

  constructor(props){ 
    super(props);

    this.state = {
        user:null,
        loading: true,
        usuario: '',
        nome: '',
        url: '',
        //comentario: '',
        lista: [],
        valorSelecionado: null
    }; 

    this.entrarPubli = this.entrarPubli.bind(this);
    this.getPublicacoesMaturi = this.getPublicacoesMaturi.bind(this);
    this.updateValorSelecionado = this.updateValorSelecionado.bind(this);
    
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({user:user});
        firebase.database().ref('usuarios').child(user.uid).on('value', (snapshot) => {
          this.setState({loading:false, usuario:snapshot.val().usuario, nome:snapshot.val().nome})
        });

        firebase.database().ref("publicacao").child("idade").equalTo("Maturi").on("value", (snapshot) => {
          
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
    });
  }

  // getPublicacoesMaturi() {
  //   var ref = firebase.database().ref("publicacao");
  //   ref.get("idade").equalsTo('Maturi').on("value", (snapshot) => {
    
  //     let state = this.state;
  //     state.lista = [];

  //     snapshot.forEach((child) => {
  //       state.lista.push({
  //         id: child.key,
  //         titulo: child.val().titulo,
  //         descricao: child.val().descricao,
  //         //url: child.val().imagem,
  //         conhecimento: child.val().conhecimento,
  //         categoria: child.val().categoria,
  //         usuario: child.val().usuario,
  //         idade: child.val().idade
  //       })
  //     });
      
  //     this.setState(state);
      
  //   });
  // }

  updateValorSelecionado(e) {
    let state = this.state;
    state.valorSelecionado = e.target.value;
    this.setState(state);
    this.getPublicacoesMaturi();
  }

  getPublicacoesMaturi() {
    var ref = firebase.database().ref("publicacao");
    ref.orderByChild("idade").equalTo(this.state.valorSelecionado).on( "value", (snapshot) => {
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

  entrarPubli(e){
    this.props.history.push({
      pathname: '/postagem',
      data: e.currentTarget.dataset.id
    })
  }
  
  render(){
    
    return (
      <div className="page-container">
        {/* Titulo da página */}
          <Helmet>
            <title>Teste</title>
          </Helmet>

        {/*Centro publicações*/}
          <div className="p-2 bd-highlight feedPublicacoesConhecimento content-wrap">
            <h2 style={{color:"#f53d29" , paddingTop: "1em", textAlign:"center"}}> Teste publicacções filtradas </h2>
            
            <div style={{paddingLeft: "14em"}}> <br />
              <label> Selecione o tipo de pessoa que fez a publicação </label> <br />
              <select className="form-select" aria-label="Default select example" onChange={this.updateValorSelecionado}>
                <option selected> Selecione </option>
                <option value="Maturi"> Maturi </option>
                <option value="Jovem"> Jovem </option>
              </select>
            </div>

            {this.state.lista.map((child) => {
              return(
                <div>
                  <div className="conteudo" style={{marginTop: "2em"}}>
                    <div className="border border-secondary rounded" style={{padding: "1.5em", backgroundColor: "#d1d7e0"}}>
                      <h4 data-id={child.id} style={{textAlignLast: "center"}}> {child.titulo} </h4>

                      <div className="row">
                        
                        <div className="col">
                          <label> <b>Área: </b>{child.categoria} </label><br/>
                          <label> <b>Conhecimento: </b>{child.conhecimento} </label>
                        </div>

                        <div className="col" style={{textAlignLast: "right", fontWeight: "bold"}}>
                          <label> {child.usuario} </label> <br />
                          <label> Usuário: {child.idade} </label> <br />
                        </div>
                        
                      </div> <br/>

                      <div style={{overflowWrap: "break-word"}}>
                        {child.descricao}
                      </div> <br/>
                      <hr/>

                      <div className="input-group" style={{justifyContent: "center"}}>
                      <button className="btn btn-outline-dark btn-help" > Ajudar </button>

                      </div>
                    </div>
                  
                    <br/>

                  </div>
                </div>
              )
            })}

          </div>
        
        <Footer></Footer>
      </div>
    ); 
  }
}

export default Teste;
