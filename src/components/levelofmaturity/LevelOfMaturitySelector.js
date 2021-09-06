import {useEffect, useState} from "react";
import { Form } from 'react-bootstrap'

export default function LevelOfMaturitySelector(props) {

    let [selectedValue, setSelectedValue] = useState("")

    useEffect(() => {
        console.log('rendering the simple LevelOfMaturitySelector')
    }, [])

    function handleChange( event ) {
        setSelectedValue(event.target.value)
        props.callback({ id: event.target.value})
        event.preventDefault()
    }

    return (
        <>
            <Form.Select value={selectedValue} onChange={handleChange}>
                <option value="Maturi" > Maturi </option>
                <option value="Jovem" > Jovem </option>
            </Form.Select>
        </>
    )

}