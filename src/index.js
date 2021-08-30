import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter} from 'react-router-dom';

import Dashboard from './pages/dashboard'
import Publicacoes from './pages/aprendizado/posts/Posts'
import MinhasPublicacoes from './pages/aprendizado/myPosts/MyPosts'
import DashboardCategoria from "./pages/categoria/DashboardCategoria";
import ResetSenha from "./pages/user/PasswordReset";
import Appbar from "./Appbar";
import OferertasAjuda from "./pages/aprendizado/offers/Offers";
import EditarOfertas from "./pages/aprendizado/editOffer/EditOffer";
import {AuthProvider} from "./contexto/AuthContext";
import Signup from "./pages/user/Signup";
import LoginPage from "./pages/user/Login";
import UserProfile from "./pages/user/UserProfile";
import ChangePassword from "./pages/user/ChangePassword";
import { Route, Switch } from "react-router-dom"
import NewPost from "./pages/aprendizado/newPost/NewPost";
import GroupsListPage from "./pages/groups/GroupsListPage";
import NewGroupPage from "./pages/groups/NewGroupPage";
import EditPost from "./pages/aprendizado/editPost/EditPost";
import MyOffers from "./pages/aprendizado/myOffers/MyOffers";
import NewOffer from "./pages/aprendizado/newOffer/NewOffer";

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <Appbar></Appbar>

            <Switch>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/changePassword" component={ChangePassword} />
                <Route exact path="/categorias" component={DashboardCategoria}/>
                <Route exact path="/cadastro" component={Signup}/>
                <Route exact path="/forgot-password" component={ResetSenha}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/publicacoes" component={Publicacoes}/>
                <Route exact path="/userProfile" component={UserProfile}/>
                <Route exact path="/novaPublicacao" component={NewPost}/>
                <Route exact path="/ofertasAjuda" component={OferertasAjuda}/>
                <Route exact path="/oferecerAjuda" component={NewOffer}/>
                <Route exact path="/minhasPublicacoes" component={MinhasPublicacoes}/>
                <Route exact path="/minhasOfertas" component={MyOffers}/>
                <Route exact path="/groups" component={GroupsListPage}/>
                <Route exact path="/newGroup" component={NewGroupPage}/>
                <Route path="/editarOfertas/:id" component={EditarOfertas}/>
                <Route path="/editarPublicacao/:id" component={EditPost}/>
            </Switch>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root'));
