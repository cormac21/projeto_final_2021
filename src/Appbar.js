import React, {Component, useState} from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import firebase from './firebase'
import NavDropdown from 'react-bootstrap/NavDropdown'
import './Appbar.css'
import profile from './profile.png'
import {useAuth} from "./contexto/AuthContext";
import DropdownItem from "react-bootstrap/DropdownItem";
import {useHistory} from "react-router-dom";

export default function Appbar(props) {

    const [username, setUsername] = useState("")
    const {currentUser} = useAuth()
    const {logout} = useAuth()
    const history = useHistory()

    if (currentUser) {
        getUserData()
    }

    async function getUserData() {
        try {
            const usersRef = await firebase.firestore().collection('users')
            const querySnapshot = await usersRef.where('email', '==', currentUser.email).get()
            if ( querySnapshot.empty ){
                console.log("No matching documents!")
                return;
            } else {
                querySnapshot.forEach( doc => {
                    setUsername(doc.data().username)
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    function logoutUser(e) {
        e.preventDefault();
        try {
            logout()
            history.push("/login")
        } catch (e) {
            alert(e.message)
        }
    }

    if (currentUser) {
        return (
            <Navbar expand="lg" className="navbar-in sticky-nav">
                <div className="container">
                    <Navbar.Brand className="brand-name">MaturiJovem</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="mr-auto"> {/* style={{alignItems: "center"}} */}
                            <Nav.Link className="menu-color" href="/dashboard"> Home </Nav.Link>

                            <NavDropdown className="menu-color" title="Conhecimento" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/publicacoes"> Pedidos de Ajuda </NavDropdown.Item>
                                <NavDropdown.Item href="/ofertasAjuda"> Ofertas de Ajuda </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="/minhasPublicacoes"> Minhas Publicações </NavDropdown.Item>
                                <NavDropdown.Item href="/minhasOfertas"> Minhas Ofertas </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="/novaPublicacao"> Pedir Ajuda </NavDropdown.Item>
                                {/* <NavDropdown.Divider /> */}
                                <NavDropdown.Item href="/oferecerAjuda"> Ofertar Ajuda </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown disabled className="menu-color" title="Trabalho" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/#"> Troca de Experiências </NavDropdown.Item>
                                {/*<NavDropdown.Divider />
                                <NavDropdown.Item href="/#">Aperfeiçoamento de Currículo</NavDropdown.Item>*/}
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="/#"> Portal de Currículos </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown disabled className="menu-color" title="Dia a dia" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/#"> Buscar Necessidades </NavDropdown.Item>
                                {/*<NavDropdown.Divider />
                                <NavDropdown.Item href="/#">Aperfeiçoamento de Currículo</NavDropdown.Item>*/}
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="/#"> Postar Necessidade </NavDropdown.Item>
                            </NavDropdown>

                        </Nav>

                        <NavDropdown
                            style={{textDecoration: "none"}}
                            className="dropdown-toggle-color"
                            title={
                                <img
                                    scr={profile}
                                    className="rounded-circle"
                                    width="32px" height="32px"
                                    alt=""
                                />
                            }
                        >
                            <div style={{paddingLeft: "1.5rem"}}>
                                <b>Usuário: </b>
                                <text> {username} </text>
                            </div>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/perfil" className="dropdown-color"> Perfil </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            {/* <NavDropdown.Item href="/#" className="dropdown-color"> Portal de Currículos </NavDropdown.Item> */}
                            <DropdownItem className="dropdown-color" onClick={logoutUser}> Sair </DropdownItem>
                        </NavDropdown>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        );
    } else {
        return (
            <Navbar expand="lg" className="navbar">
                <div className="container">
                    <Navbar.Brand href="/" className="brand-name">MaturiJovem</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav style={{marginLeft: "auto"}}>

                            <Nav.Link href="/cadastro">
                                <Button className="btn-header-out btn-md">Cadastro</Button>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        );
    }
}