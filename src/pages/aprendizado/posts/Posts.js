import { useState} from 'react';
import firebase from '../../../firebase.js';
import {PostProvider} from "../../../contexto/PostContext";
import PostView from "../../../components/PostView";
import {Container} from "react-bootstrap";
import LevelOfMaturitySelector from "../../../components/LevelOfMaturitySelector";
import {useAuth} from "../../../contexto/AuthContext";
import CategorySelector from "../../../components/CategorySelector";

export default function Posts(props) {

    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    const [levelOfMaturity, setLevelOfMaturity] = useState("")
    const [category, setCategory] = useState("")
    const [list, setList] = useState([])
    const [categoryList, setCategoryList ] = useState([])
    const usersRef = firebase.firestore().collection("users");
    const postsRef = firebase.firestore().collection("posts");
    const categoriesRef = firebase.firestore().collection('categories');
    const { currentUser } = useAuth()

    getUserDetails()

    async function getUserDetails() {
        try {
            const doc = await usersRef.doc(currentUser.uid).get();
            if (!doc.exists) {
                console.log("Não encontrei usuários com este uid!")
                return;
            } else {
                setUsername(doc.data().username);
                setLoading(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function getPostsByLevelOfMaturity() {
        try {
            const query = postsRef.where('levelOfMaturity', '==', levelOfMaturity)
            await query.get((snapshot) => {
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
    }

    async function getPostsByCategory() {
        try {
            const query = postsRef.where('category', '==', category)
            await query.get((snapshot) => {
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
    }

    async function getAllCategories() {
        try {
            await categoriesRef.get((snap) => {
                const tempCategoryList = []
                snap.forEach((doc) => {
                    tempCategoryList.push({
                        id: doc.data().uid,
                        name: doc.data().name
                    })
                })
                setCategoryList(tempCategoryList)
            })
        } catch (e) {
            console.log(e)
        }
    }

    async function getAllPosts() {
        try {
            await postsRef.get((snap) => {
                const tempPostsList = []
                snap.forEach((doc) => {
                    tempPostsList.push({

                    })
                })
                setList(tempPostsList)
            })
        } catch (e) {
            console.log(e)
        }
    }

    function triggerFilter() {
        //TODO
    }

    function levelOfMaturityCallback(data) {
        setLevelOfMaturity(data.id)
        triggerFilter()
    }

    function categorySelectorCallback(data) {
        setCategory(data.id)
        triggerFilter()
    }

    return (
        <>
            <Container className="d-flex justify-content-center" style={{minHeight: "100vh"}}>
                <h2 style={{color: "#3F4596", paddingTop: "1em", textAlign: "center"}}> Pedidos de Ajuda </h2>
                <div className="row" style={{marginTop: "2em"  , paddingLeft: "20vw", marginRight: "auto"}}>
                    <div className="col">
                        <label> Selecione o tipo de pessoa que fez a publicação </label> <br />
                        <LevelOfMaturitySelector callback={levelOfMaturityCallback} />
                    </div>
                    <div className="col">
                        <label> Selecione a categoria da publicação </label> <br />
                        <CategorySelector callback={categorySelectorCallback}></CategorySelector>
                    </div>
                </div>
                {list.map((child) => {
                    let categoryTemp = categoryList.filter((categ) => child.category === categ.id)[0]
                    let isOwner = false
                    if (child.usuario === currentUser.uid) {
                        child.isOwner = true;
                    }
                    return (
                        <PostProvider post={child}>
                            <PostView  ></PostView>
                        </PostProvider>
                    )
                })}
            </Container>
        </>
    )

}
