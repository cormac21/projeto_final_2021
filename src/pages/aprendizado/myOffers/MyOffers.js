import {useEffect, useState} from 'react';
import firebase from '../../../firebase.js';
import OfferView from "../../../components/offer/OfferView"
import {useAuth} from "../../../contexto/AuthContext";
import NoOffersBanner from "../../../components/offer/NoOffersBanner";
import {OfferProvider} from "../../../contexto/OfferContext";

export default function MyOffers(props) {

    const { currentUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const offersRef = firebase.firestore().collection("offers")
    const categoriesRef = firebase.firestore().collection("categories")

    useEffect(() => {
        try {
            setLoading(true)
            const query = offersRef.where("user", "==", currentUser.uid)
            query.get((snapshot) => {
                const temporaryList = []
                snapshot.forEach((doc) => {
                    temporaryList.push({
                        id: doc.data().uid,
                        title: doc.data().title,
                        description: doc.data().description,
                        levelOfKnowledge: doc.data().levelOfKnowledge,
                        category: doc.data().category,
                        username: doc.data().username,
                        levelOfMaturity: doc.data().levelOfMaturity
                    })
                })
                setList(temporaryList)
            })
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }, [list])

    useEffect(() => {
        try {
            if ( categoryList.length == 0) {
                categoriesRef.get().then((snapshot) => {
                    const temporaryList = []
                    snapshot.forEach((doc) => {
                        temporaryList.push({
                            id: doc.id,
                            name: doc.data().name
                        })
                    })
                    setCategoryList(temporaryList)
                })
            }
        } catch (e) {
            console.log(e)
        }
    }, [categoryList])

    if( list.length == 0) {
        return (
            <div className="page-container">
                <div className="p-2 bd-highlight feedPublicacoesConhecimento content-wrap">
                    <h2 style={{color: "#3F4596", paddingTop: "1em", textAlign: "center"}}> Minhas Ofertas de Ajuda </h2>
                    <NoOffersBanner />
                </div>
            </div>
        )
    } else {
        return (
            <div className="page-container">
                <div className="p-2 bd-highlight feedPublicacoesConhecimento content-wrap">
                    <h2 style={{color: "#3F4596", paddingTop: "1em", textAlign: "center"}}> Minhas Ofertas de Ajuda </h2>
                    {
                        list.map((item) => {
                            let category = categoryList.filter((categ) => item.category === categ.id)[0]
                            let isOwner = false;
                            if (item.user === currentUser.uid) {
                                isOwner = true;
                            }
                            item.isOwner = isOwner;
                            return (
                                <OfferProvider >
                                    <OfferView ></OfferView>
                                </OfferProvider>
                            )
                        })}
                </div>
                {/* <Footer></Footer> */}
            </div>
        )
    }
}
