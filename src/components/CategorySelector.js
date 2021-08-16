import { useState } from "react";
import firebase from '../firebase';
import {Form} from 'react-bootstrap'

export default function CategorySelector(props) {

    let [selectedValue, setSelectedValue] = useState("")
    const [selectedCategory, setSelectedCategory] = useState(props.categoriaSelecionada)
    let [name, setName] = useState('')
    let list = useState([])
    const categoriesRef = firebase.firestore().collection("categories")

    getCategories();

    async function getCategories() {
        try {
            const snapshot = await categoriesRef.get();
            snapshot.forEach(doc => {
                list.push({
                    id: doc.id,
                    nome: doc.name
                })
            })
            if( selectedCategory != undefined ) {
                let value = list.filter((item) => item.id === selectedCategory)[0]
                setSelectedValue(value.id)
            }
        } catch (e) {
            console.log(e)
        }
    }

    function handleChange(event) {
        setName(event.target.options[event.target.selectedIndex].text)
        setSelectedValue(event.target.value)
        props.callback({id: event.target.value})
        event.preventDefault()
    }

    return (
        <>
            <Form.Control as="select" value={selectedValue} onChange={handleChange}>
                <option value=""></option>
                {list.map((child) => {
                    return (
                        <option value={child.id}>{child.name}</option>
                    )
                })}
            </Form.Control>
        </>
    )
}
