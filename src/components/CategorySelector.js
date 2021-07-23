import { useState } from "react";
import firebase from '../firebase';

export default function CategorySelector(props) {

    let [selectedValue, setSelectedValue] = useState("")
    const [selectedCategory, setSelectedCategory] = useState(props.categoriaSelecionada)
    let [name, setName] = useState('')
    let list = useState([])
    const categoriesRef = firebase.firestore().collection("categories")

    getCategories();

    async function getCategories() {
        const snapshot = await categoriesRef.get();
        snapshot.forEach(doc => {
            list.push({
                id: doc.key,
                nome: doc.val().nome
            })
        })
        setSelectedValueState()
    }

    function setSelectedValueState() {
        if (selectedCategory != undefined) {
            let value = list.filter((item) => item.id === selectedCategory)[0]
            selectedValue = value.id
        }
    }

    function handleChange(event) {
        name = event.target.options[event.target.selectedIndex].text
        selectedValue = event.target.value
        props.callback({id: event.target.value, nome: name})
        event.preventDefault()
    }

    return (
        <>
            <select value={selectedValue} onChange={handleChange}>
                <option value=""></option>
                {list.map((child) => {
                    return (
                        <option value={child.id}>{child.name}</option>
                    )
                })}
            </select>
        </>
    )
}
