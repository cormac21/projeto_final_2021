import React, {useRef} from 'react';
import firebase from '../../firebase'
import Footer from "../../Footer";

export default function DashboardCategoria() {
    const categoryName = useRef()

    var ref = firebase.firestore().collection("categories")

    async function addCategory() {
        try {
            await ref.add({
                name: categoryName.current.value
            })
            alert("Category created successfully!")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="page-container">
            <div>
                <div className="p-2 bd-highlight content-wrap">
                    <h2 style={{color: "#f53d29", paddingTop: "1em", textAlign: "center"}}> Categorias </h2>
                    <div className="w-25">
                        <input type="text" placeholder="Nome da Categoria" autoFocus
                               className="form-control form-control-lg" ref={categoryName}/>
                    </div>
                    <div>
                        <button onClick={addCategory}> Adicionar Categoria</button>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}