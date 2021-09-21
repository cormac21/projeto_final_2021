import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import Dashboard from './pages/dashboard'
import Publicacoes from './pages/aprendizado/posts/Posts'
import MinhasPublicacoes from './pages/aprendizado/myPosts/MyPosts'
import DashboardCategoria from "./pages/categoria/DashboardCategoria";
import ResetSenha from "./pages/user/PasswordReset";
import Appbar from "./Appbar";
import OferertasAjuda from "./pages/aprendizado/offers/Offers";
import EditarOfertas from "./pages/aprendizado/editOffer/EditOffer";
import Signup from "./pages/user/Signup";
import LoginPage from "./pages/user/Login";
import UserProfile from "./pages/user/UserProfile";
import ChangePassword from "./pages/user/ChangePassword";
import NewPost from "./pages/aprendizado/newPost/NewPost";
import GroupsListPage from "./pages/groups/GroupsListPage";
import NewGroupPage from "./pages/groups/NewGroupPage";
import EditPost from "./pages/aprendizado/editPost/EditPost";
import MyOffers from "./pages/aprendizado/myOffers/MyOffers";
import NewOffer from "./pages/aprendizado/newOffer/NewOffer";
import EditGroupPage from "./pages/groups/EditGroupPage";
import PrivateRoute from "./components/PrivateRoute";
import {AuthProvider} from "./context/AuthContext";

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <Appbar></Appbar>

            <Switch>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/mudar_senha" component={ChangePassword} />
                <Route exact path="/categorias" component={DashboardCategoria}/>
                <Route exact path="/cadastro" component={Signup}/>
                <Route exact path="/reset_senha" component={ResetSenha}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/publicacoes" component={Publicacoes}/>
                <Route exact path="/perfil_usuario" component={UserProfile}/>
                <Route exact path="/nova_publicacao" component={NewPost}/>
                <Route exact path="/ofertas_ajuda" component={OferertasAjuda}/>
                <Route exact path="/nova_oferta" component={NewOffer}/>
                <Route exact path="/minhas_publicacoes" component={MinhasPublicacoes}/>
                <Route exact path="/minhas_ofertas" component={MyOffers}/>
                <PrivateRoute exact path="/grupos" component={GroupsListPage}/>
                <PrivateRoute exact path="/novo_grupo" component={NewGroupPage}/>
                <PrivateRoute path="/edit_group/:id" component={EditGroupPage}/>
                <Route path="/editarOfertas/:id" component={EditarOfertas}/>
                <Route path="/editarPublicacao/:id" component={EditPost}/>
            </Switch>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root'));
