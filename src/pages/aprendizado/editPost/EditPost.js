import { useState} from "react";
import firebase from '../../../firebase.js';
import CandidateList from "../../../components/CandidateList";
import {useAuth} from "../../../contexto/AuthContext";
import {useHistory} from "react-router-dom";
import CategorySelector from "../../../components/CategorySelector";
import {Alert, Button, Card, Form} from "react-bootstrap";

export default function EditPost(props) {

    const { currentUser } = useAuth()
    const [postId, setPostId] = useState(props.match.params.id)
    const [categoryId, setCategoryId] = useState(new URLSearchParams(props.location.search).get("categoria"))
    const [post, setPost] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [levelOfKnowledge, setLevelOfKnowledge] = useState()
    const [levelOfMaturity, setLevelOfMaturity] = useState()
    const [candidates, setCandidates] = useState([])
    const [active, setActive] = useState()
    const postsRef = firebase.firestore().collection("posts");
    const history = useHistory()

    getPost()

    async function getPost() {
        try {
            await postsRef.doc(postId).get((snapshot) => {
                setPost(snapshot.data())
                setTitle(snapshot.data().title)
                setDescription(snapshot.data().description)
                setLevelOfKnowledge(snapshot.data().levelOfKnowledge)
                setCategoryId(snapshot.data().category)
                setLevelOfMaturity(snapshot.data().levelOfMaturity)
                setCandidates(snapshot.data().candidates)
            })
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    async function handleEdit() {
        try {
            setLoading(true)
            await postsRef.doc(postId).set({
                title: title.current.value,
                description: description.current.value,
                levelOfKnowledge: levelOfKnowledge,
                category: categoryId,
                updatedOn: new Date().toISOString(),
                levelOfMaturity: levelOfMaturity,
                candidates: candidates,
                active: active
            })
            setLoading(false)
            alert("Deu certo o update!!")
            history.replace("/myPosts")
        } catch (e) {
            console.log(e)
        }
    }

    function categorySelectorCallback(data){
        setCategoryId(data.id)
    }

    function updateTitleValue(event) {
        event.preventDefault()
        setTitle(event.target.value)
    }

    function updateDescriptionValue(event) {
        event.preventDefault()
        setDescription(event.target.value)
    }

    function handleKnowledgeChange(event) {
        event.preventDefault()
        setLevelOfKnowledge(event.target.options[event.target.selectedIndex].text)
    }

    return (
        <div className="page-container">
            <div className="p-2 bd-highlight editarPublicacao content-wrap">

                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Criar Pedido de Ajuda</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleEdit}>
                            <Form.Group id="title">
                                <Form.Label>Titulo</Form.Label>
                                <Form.Control type="text" value={title} onChange={updateTitleValue} required/>
                            </Form.Group>
                            <br/>
                            <Form.Group id="description">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control as="textarea" rows={3} value={description} onChange={updateDescriptionValue}/>
                            </Form.Group>
                            <br/>
                            <Form.Group id="levelOfKnowledge">
                                <Form.Label>Nível de Conhecimento</Form.Label>
                                <Form.Select value={levelOfKnowledge} onChange={handleKnowledgeChange}>
                                    <option value=""></option>
                                    <option value="Sem Conhecimento">Sem Conhecimento</option>
                                    <option value="Baixo">Baixo</option>
                                    <option value="Médio">Médio</option>
                                    <option value="Alto">Alto</option>
                                </Form.Select>
                            </Form.Group>
                            <br/>
                            <Form.Group id="category">
                                <Form.Label>Categoria</Form.Label>
                                <CategorySelector value={categoryId} callback={categorySelectorCallback}/>
                            </Form.Group>
                            <br/>
                            <Button className="w-100" type="submit" disabled={loading}>Editar Post</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="conteudoEditarPublicacao" style={{marginTop: "7vh"}}>
                    <h3 style={{textAlign: "center", color: "#3F4596"}}>Editar Pedido de Ajuda</h3>
                    <hr/>

                    <div className="form-group">
                        <input type="text" placeholder="Titulo" id="tituloPubli"
                               className="form-control form-control-md"
                               value={this.state.titulo}
                               onChange={(e) => this.setState({titulo: e.target.value})} required/>
                    </div>
                    <div className="form-group">
                            <textarea id="descricaoPubli" placeholder="Descrição"
                                      className="form-control descricao" cols="40" rows="7"
                                      value={this.state.descricao}
                                      onChange={(e) => this.setState({descricao: e.target.value})} required/>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col center">
                                <label> Nível de Conhecimento </label> <br/>
                                <select className="form-select left-select" aria-label="Default select example"
                                        value={this.state.conhecimento}
                                        onChange={(e) => this.setState({conhecimento: e.target.value})} required>
                                    <option defaultValue value=""></option>
                                    <option value="Sem Conhecimento">Sem Conhecimento</option>
                                    <option value="Baixo">Baixo</option>
                                    <option value="Médio">Médio</option>
                                    <option value="Alto">Alto</option>
                                </select>
                            </div>

                            <div className="col mb-4">
                                <label> Categoria </label> <br/>
                                <CategorySelector />
                            </div>
                        </div>
                    </div>

                    <CandidateList publicacaoId={this.state.idPublicacao}
                                   ehDono={this.state.ehDono}></CandidateList>
                    <br/>
                    <br/>
                    <button type="button" className="btn btn-block btn-novoPedido"
                            onClick={this.editarPublicacao}>Editar
                    </button>
                    <hr/>

                    <br/>
                </div>
            </div>
            {/* <Footer/> */}
        </div>
    )

}