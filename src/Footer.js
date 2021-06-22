import React from 'react'
import './footer.css';

function Footer() {
    return (
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    {/* Coluna 1 */}
                    <div className="col-md-3 col-sm-6">
                        <h4 style={{color: "black"}}>MaturiJovem</h4>
                        <ul className="list-unstyled">
                            <li>Contato</li>
                            <li>Lorem</li>
                            <li>Lorem</li>
                            <li>Lorem</li>
                        </ul>
                    </div>

                    {/* Coluna 2 */}
                    <div className="col-md-3 col-sm-6">
                        <h4>Conhecimento</h4>
                        <ul className="list-unstyled">
                            <li><a href="/publicacoes">Ver Publicações</a></li>
                            <li><a href="/minhasPublicacoes">Minhas Publicações</a></li>
                            <li><a href="/novaPublicacao">Nova Publicação</a></li>
                        </ul>
                    </div>

                    {/* Coluna 3 */}
                    <div className="col-md-3 col-sm-6">
                        <h4>Trabalho</h4>
                        <ul className="list-unstyled">
                            <li>Troca de Experiências</li>
                            {/* <li>Aperfeiçoamento de Currículo</li> */}
                            <li>Ver Currículos</li>
                        </ul>
                    </div>

                    {/* Coluna 4 */}
                    {/* <div className="col-md-3 col-sm-6">
                        <h4>Dia a Dia</h4>
                        <ul className="list-unstyled">
                            <li>Lorem</li>
                            <li>Lorem</li>
                            <li>Lorem</li>
                            <li>Lorem</li>
                        </ul>
                    </div> */}
                </div>
                < hr/>

                {/* Footer Copyright */}
                <div className="bottom-footer">
                    <p className="text-xs-center">
                        &copy;{new Date().getFullYear()} MaturiJovem - Todos os Direitos Reservados
                    </p>
                </div>
            </div>
            
        </div>
    )
}

export default Footer;