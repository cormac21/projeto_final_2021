import { useState, useEffect } from "react";
import firebase from '../../firebase';
import {Form} from 'react-bootstrap'

export default function CategorySelector(props) {

    let [selectedValue, setSelectedValue] = useState("")
    const [selectedCategory, setSelectedCategory] = useState(props.value)
    let [list, setList] = useState([])
    const categoriesRef = firebase.firestore().collection("categories")

    useEffect(() => {
        console.log('This only runs when selectedCategory changes')
        if( selectedCategory != undefined ) {
            let value = list.filter((item) => item.id === selectedCategory)[0]
            setSelectedValue(value.id)
        }
    }, [selectedCategory])

    useEffect(() => {
        console.log('This only runs when list changes')
        try {
            if ( list.length == 0) {
                categoriesRef.get().then((snapshot) => {
                    const temporaryList = []
                    snapshot.forEach((doc) => {
                        temporaryList.push({
                            id: doc.id,
                            name: doc.data().name
                        })
                    })
                    setList(temporaryList)
                })
            }
        } catch (e) {
            console.log(e)
        }
    }, [list])

    useEffect(() => {
        console.log('This runs when anything changes')
    }, [])

    function handleChange(event) {
        setSelectedValue(event.target.value)
        props.callback({id: event.target.value})
        event.preventDefault()
    }

    return (
        <>
            <Form.Select value={selectedValue} onChange={handleChange}>
                <option value=""></option>
                {list.map((options) => {
                    return (
                        <option key={options.id} value={options.id}>{options.name}</option>
                    )
                })}
            </Form.Select>
        </>
    )
}
