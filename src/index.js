import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter} from 'react-router-dom';

import Dashboard from './pages/dashboard'
import Publicacoes from './pages/aprendizado/publicacoes'
import NovaPublicacao from './pages/aprendizado/novaPublicacao'
import MinhasPublicacoes from './pages/aprendizado/minhasPublicacoes'
import MinhasOfertas from './pages/aprendizado/minhasOfertas'
import DashboardCategoria from "./pages/categoria/DashboardCategoria";
import ResetSenha from "./pages/user/PasswordReset";
import Appbar from "./Appbar";
import OferecerAjuda from "./pages/aprendizado/oferecerAjuda";
import OferertasAjuda from "./pages/aprendizado/ofertasAjuda";
import EditarPublicacao from "./pages/aprendizado/editarPublicacao";
import EditarOfertas from "./pages/aprendizado/editarOferta";
import {AuthProvider} from "./contexto/AuthContext";
import Signup from "./pages/user/Signup";
import LoginPage from "./pages/user/Login";
import UserProfile from "./pages/user/UserProfile";
import ChangePassword from "./pages/user/ChangePassword";
import Switch from "react-router-dom/Switch";
import Route from "react-router-dom/Route"

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
                <Route exact path="/novaPublicacao" component={NovaPublicacao}/>
                <Route exact path="/ofertasAjuda" component={OferertasAjuda}/>
                <Route exact path="/oferecerAjuda" component={OferecerAjuda}/>
                <Route exact path="/minhasPublicacoes" component={MinhasPublicacoes}/>
                <Route exact path="/minhasOfertas" component={MinhasOfertas}/>
                <Route path="/editarOfertas/:id" component={EditarOfertas}/>
                <Route path="/editarPublicacao/:id" component={EditarPublicacao}/>
            </Switch>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root'));
