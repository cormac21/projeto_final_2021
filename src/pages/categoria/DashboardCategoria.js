import React, {useRef, useState} from 'react';
import firebase from '../../firebase'
import {Helmet} from 'react-helmet';
import Footer from "../../Footer";
import {forEach} from "react-bootstrap/ElementChildren";

export default function DashboardCategoria() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const nomeCategoria = useRef()

    var ref = firebase.database().ref('categorias');

    function adicionarCategoria() {
        ref.push({
            nome: nomeCategoria.current.value
        })
    }

    return (
        <div className="page-container">
            <div>
                <Helmet>
                    <title>Categorias</title>
                </Helmet>
                <div className="p-2 bd-highlight content-wrap">
                    <h2 style={{color: "#f53d29", paddingTop: "1em", textAlign: "center"}}> Categorias </h2>
                    <div className="w-25">
                        <input type="text" placeholder="Nome da Categoria" autoFocus
                               className="form-control form-control-lg" ref={nomeCategoria}/>
                    </div>
                    <div>
                        <button onClick={adicionarCategoria}> Adicionar Categoria</button>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}