import {useEffect, useState} from 'react';
import firebase from '../../../firebase.js';
import PostView from "../../../components/PostView"
import {PostProvider} from "../../../contexto/PostContext";
import {useAuth} from "../../../contexto/AuthContext";
import NoPostsBanner from "../../../components/NoPostsBanner";

export default function MyPosts(props) {

    const {currentUser} = useAuth()
    const [list, setList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [userList, setUserList] = useState([])
    const postsRef = firebase.firestore().collection("posts")
    const categoriesRef = firebase.firestore().collection("categories")

    useEffect(() => {
        try {
            const query = postsRef.where("user", "==", currentUser.uid)
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
            <>
                <div className="page-container">
                    <div className="p-2 bd-highlight feedPublicacoesConhecimento content-wrap">
                        <h2 style={{color: "#3F4596", paddingTop: "1em", textAlign: "center"}}> Minhas Publicações </h2>
                        <NoPostsBanner />
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="page-container">
                    <div className="p-2 bd-highlight feedPublicacoesConhecimento content-wrap">
                        <h2 style={{color: "#3F4596", paddingTop: "1em", textAlign: "center"}}> Minhas Publicações </h2>
                        {
                            list.map((item) => {
                                let category = categoryList.filter((categ) => item.category === categ.id)[0]
                                let isOwner = false;
                                if (item.user === currentUser.uid) {
                                    isOwner = true;
                                }
                                item.isOwner = isOwner;
                                return (
                                    <PostProvider value={item}>
                                        <PostView/>
                                    </PostProvider>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}

