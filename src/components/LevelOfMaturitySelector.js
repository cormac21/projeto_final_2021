import {useState} from "react";
import firebase from "../firebase";
import {Form} from "react-bootstrap";


export default function LevelOfMaturitySelector(props) {

    let [selectedValue, setSelectedValue] = useState("")
    const [preSelectedLevel, setPreSelectedLevel] = useState("")
    let [list, setList] = useState([])
    const levelOfMaturityRef = firebase.firestore().collection("maturity_level");

    getMaturityLevels()
    if( preSelectedLevel != undefined ) {
        let value = list.filter((item) => item.id === preSelectedLevel )[0]
        setSelectedValue(value)
    }

    async function getMaturityLevels() {
        try {
            if ( list.length == 0) {
                await levelOfMaturityRef.get((snapshot) => {
                    const temporaryList = []
                    snapshot.forEach((doc) => {
                        temporaryList.push({
                            id: doc.data().uid,
                            name: doc.data().name
                        })
                    })
                    setList(temporaryList)
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

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