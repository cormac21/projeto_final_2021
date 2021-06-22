import DropdownItem from "react-bootstrap/DropdownItem";
import React from "react";
import firebase from "./firebase";
import {useHistory} from "react-router-dom";

export default function LogoutButton(props) {
    let history = useHistory()
    const callback = props.callback;

    function logout(e) {
        firebase.auth().signOut().then(() => {
            //e.preventDefault()
            history.push( "/", {update: true})
            callback("logout");
            e.preventDefault();
        }).catch ((error) => {
            // alert ("Não consegui dar logout!")
            alert(error.message)
        })
    }

    return (
        <DropdownItem className="dropdown-color" onClick={logout}> Sair </DropdownItem>
    )
}

