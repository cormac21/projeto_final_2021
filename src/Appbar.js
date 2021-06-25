import React, {Component, useState} from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import firebase from './firebase'
import NavDropdown from 'react-bootstrap/NavDropdown'
import './Appbar.css'
import LogoutButton from "./components/LogoutButton"
import profile from './profile.png'
import {useAuth} from "./contexto/AuthContext";

export default function Appbar(props) {

    const [user, setUser] = useState("")
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)
    const { currentUser } = useAuth()

    getUserData()

    async function getUserData() {
        try {
            setLoading(true)
            const doc = await firebase.firestore().collection('users').where('email', '==', currentUser.email).get()
            setLoading(false)
            if (doc.exists) {
                console.log("Document data: ", doc.data());
                setUsername(doc.data().username)
            } else {
                console.log("No data found for query!")
            }
        } catch (e) {
            console.log(e)
        }
    }

    function handleCallback() {
        setUser(null)
    }

    if (user) {
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
                            <LogoutButton callback={handleCallback}/>
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