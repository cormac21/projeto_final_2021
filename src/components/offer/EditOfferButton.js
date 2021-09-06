import {useState} from "react";
import {useHistory} from "react-router-dom";

export default function EditOfferButton(props) {
    const offerId = useState(props.offerId)
    const isOwner = useState(props.isOwner)
    let history = useHistory()

    function redirectToEditOfferPage() {
        history.push("/editarOfertas/" + offerId );
    }

    if (isOwner) {
        return (
            <div style={{alignContent: "center"}}>
                <button onClick={redirectToEditOfferPage}> Editar
                </button>
            </div>
        )
    } else {
        return (
            <div/>
        )
    }
}
