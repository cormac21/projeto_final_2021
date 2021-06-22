import { useState } from "react";
import firebase from '../firebase';

export default function SeletorDeCategoria(props) {

    let [valorSelecionado, setValorSelecionado] = useState("")
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(props.categoriaSelecionada)
    let [nome, setNome] = useState('')
    let lista = useState([])

    getCategorias();

    function getCategorias() {
        firebase.database().ref('categorias').on('value', (snapshot) => {
            snapshot.forEach((child) => {
                lista.push({
                    id: child.key,
                    nome: child.val().nome
                })
            })
            setarValorSelecionado()
        })
    }

    function setarValorSelecionado() {
        if (categoriaSelecionada != undefined) {
            let value = lista.filter((item) => item.id === categoriaSelecionada)[0]
            valorSelecionado = value.id
        }
    }

    function handleChange(event) {
        nome = event.target.options[event.target.selectedIndex].text
        valorSelecionado = event.target.value
        props.callback({id: event.target.value, nome: nome})
        event.preventDefault()
    }

    return (
        <>
            <select value={valorSelecionado} onChange={handleChange}>
                <option value=""></option>
                {lista.map((child) => {
                    return (
                        <option value={child.id}>{child.nome}</option>
                    )
                })}
            </select>
        </>
    )
}
