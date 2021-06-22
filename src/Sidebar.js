import React, {Component} from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import './Sidebar.css'

class Sidebar extends Component {

    render(){
        return (
            <div class="sidenav">
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#clients">Clients</a>
                <a href="#contact">Contact</a>
            </div>
        )
    }
}

export default Sidebar;