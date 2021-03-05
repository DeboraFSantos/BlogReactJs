import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './login.css'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.entrar = this.entrar.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount(){
        //Verificar se tem usuário logado
        if(firebase.getCurrent()){
            return this.props.history.replace('dashboard');
        }
    }

    entrar(e){
        e.preventDefault();
        this.login();
    }

    login = async () => {
        const {email, password} = this.state;

        try{
            await firebase.login(email, password)
            .catch((error)=>{
                if(error.code === 'auth/user-not-found'){
                    alert('Este usuário não existe!');
                }else{
                    alert('Código de erro:' + error.code);
                    return null;
                }
            });
            this.props.history.replace('/dashboard');

        }catch(error){
            alert.apply(error.message);
        }
    }
    
    render(){
        return(
            <div>
                <form onSubmit={this.entrar} id="login">
                    <h1>Entre em sua conta.</h1>
                    <p>Digite os dados que você registrou durante o cadastro</p>
                    <label>Email:</label>
                    <input type="email" autoComplete="off" autoFocus value={this.state.email}  onChange={(e) => this.setState({email: e.target.value})} placeholder="teste@teste.com"/>
                    <label>Password:</label>
                    <input type="password" autoComplete="off" value={this.state.password}  onChange={(e) => this.setState({password: e.target.value})} placeholder="***"/>

                    <button type="submit">Entrar</button>

                    <Link to="/register" className="text">Ainda não possui uma conta? <b>Registre-se</b></Link>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);