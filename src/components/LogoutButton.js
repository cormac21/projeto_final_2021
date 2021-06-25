import DropdownItem from "react-bootstrap/DropdownItem";
import React from "react";
import {useHistory} from "react-router-dom";
import {useAuth} from "../contexto/AuthContext";

export default function LogoutButton(props) {
    let history = useHistory()
    const callback = props.callback;
    const {logout} = useAuth()

    function logoutUser(e) {
        e.preventDefault();
        try {
            logout()
            history.push( "/", {update: true})
            callback();
        } catch (e) {
            alert(e.message)
        }
    }

    return (
        <DropdownItem className="dropdown-color" onClick={logoutUser}> Sair </DropdownItem>
    )
}

