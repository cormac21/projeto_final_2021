import {Component} from 'react'

class BotaoEditarOfertas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ofertas: props.ofertasId,
            ehDono: props.ehDono
        }

        this.irParaPaginaDeEdicao = this.irParaPaginaDeEdicao.bind(this);
    }

    irParaPaginaDeEdicao() {
        this.props.history.push("/editarOfertas/" + this.state.ofertas);
    }

    render() {
        if (this.state.ehDono) {
            return (
                <div style={{alignContent: "center"}}>
                    <button onClick={() => this.irParaPaginaDeEdicao()}> Editar
                    </button>
                </div>
            )
        } else {
            return (
                <div/>
            )
        }
    }
}

export default BotaoEditarOfertas