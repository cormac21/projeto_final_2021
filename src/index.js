import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import {Container} from 'react-bootstrap'

import Login from './pages/login'
import Cadastro from './pages/cadastro'
import Dashboard from './pages/dashboard'
import Publicacoes from './pages/aprendizado/publicacoes'
import NovaPublicacao from './pages/aprendizado/novaPublicacao'
import MinhasPublicacoes from './pages/aprendizado/minhasPublicacoes'
import MinhasOfertas from './pages/aprendizado/minhasOfertas'
import DashboardCategoria from "./pages/categoria/DashboardCategoria";
import Perfil from './pages/perfil'
import ResetSenha from "./pages/resetSenha";
import Appbar from "./Appbar";
import OferecerAjuda from "./pages/aprendizado/oferecerAjuda";
import OferertasAjuda from "./pages/aprendizado/ofertasAjuda";
import EditarPublicacao from "./pages/aprendizado/editarPublicacao";
import EditarOfertas from "./pages/aprendizado/editarOferta";
import {AuthProvider} from "./contexto/AuthContext";

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <Appbar></Appbar>

            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/categorias" component={DashboardCategoria}/>
                <Route exact path="/cadastro" component={Cadastro}/>
                <Route exact path="/resetSenha" component={ResetSenha}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/publicacoes" component={Publicacoes}/>
                <Route exact path="/perfil" component={Perfil}/>
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