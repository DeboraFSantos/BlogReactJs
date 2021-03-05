import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './register.css'

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.register = this.register.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }

    componentDidMount(){
        //Verificar se tem usuário logado
        if(firebase.getCurrent()){
            return this.props.history.replace('dashboard');
        }
    }

    register(e){
        e.preventDefault();
        this.onRegister();
    }

    onRegister = async() => {
        try{
            const {nome, email, password} = this.state;
            await firebase.register(nome, email, password);
            this.props.history.replace('/dashboard');
        }catch(error){
            alert(error.message);
        }
    }


    render(){
        return(
            <div>
                <form onSubmit={this.register} id="register">
                    <h1>Crie sua conta.</h1>
                    <p>Digite os dados para se cadastrar</p>
                    <label>Nome:</label>
                    <input type="text" value={this.state.nome} autoFocus autoComplete="off" onChange={(e) => this.setState({nome: e.target.value})} placeholder="Digite seu nome"/>
                    <label>Email:</label>
                    <input type="email" value={this.state.email} autoComplete="off" onChange={(e) => this.setState({email: e.target.value})} placeholder="Digite seu e-mail"/>
                    <label>Password:</label>
                    <input type="password" autoComplete="off" value={this.state.password}  onChange={(e) => this.setState({password: e.target.value})} placeholder="***"/>

                    <button type="submit">Cadastrar</button>

                    <Link to="/login" className="text">Já possui uma conta? <b>Entre</b></Link>
                </form>
            </div>
        );
    }
}

export default withRouter(Register);