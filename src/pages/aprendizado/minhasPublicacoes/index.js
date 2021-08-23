import { useState} from 'react';
import firebase from '../../../firebase.js';
import PostView from "../../../components/PostView"
import BannerNenhumaPublicacao from "../../../components/NoPostsBanner"
import PostContext from "../../../contexto/PostContext";
import {useAuth} from "../../../contexto/AuthContext";

export default function MyPosts(props) {

    const {currentUser} = useAuth()
    const [list, setList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [userList, setUserList] = useState([])
    const postsRef = firebase.firestore().collection("posts")
    const categoriesRef = firebase.firestore().collection("categories")

    getMyPosts()

    async function getMyPosts() {
        try {
            const query = postsRef.where("user", "==", currentUser.uid)
            await query.get((snapshot) => {
                snapshot.forEach((doc) => {
                    const temporaryList = []
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
            })
        } catch (e) {
            console.log(e)
        }
    }

    async function getCategories() {
        try {
            if ( categoryList.length == 0) {
                await categoriesRef.get().then((snapshot) => {
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
    }

    if( list.length == 0) {
        return (
            <>
                <div className="page-container">
                    <div className="p-2 bd-highlight feedPublicacoesConhecimento content-wrap">
                        <h2 style={{color: "#3F4596", paddingTop: "1em", textAlign: "center"}}> Minhas Publicações </h2>
                        <BannerNenhumaPublicacao></BannerNenhumaPublicacao>
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
                                    <PostContext.Provider value={item}>
                                        <PostView/>
                                    </PostContext.Provider>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}

