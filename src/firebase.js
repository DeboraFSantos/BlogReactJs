import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage'

let firebaseConfig = {
    apiKey: "AIzaSyCbMoTu2NTUZ6m1TvHLR2gOtYzDyYyvIaA",
    authDomain: "reactapp-99edb.firebaseapp.com",
    databaseURL: "https://reactapp-99edb-default-rtdb.firebaseio.com",
    projectId: "reactapp-99edb",
    storageBucket: "reactapp-99edb.appspot.com",
    messagingSenderId: "962415539789",
    appId: "1:962415539789:web:cbec3ad78c7d445503ce04",
    measurementId: "G-DZ1L88K2XG"
  };

class Firebase{
    constructor(){
        app.initializeApp(firebaseConfig);
    
        // referenciado a database para acessar em outros locais
        this.app = app.database();

        this.storage = app.storage();
    }

    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    logout(email, password){
        return app.auth().signOut();
    }

    async register(nome, email, password){
        await app.auth().createUserWithEmailAndPassword(email, password)
        
        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome:nome
        })
    }

    isInitialized(){
        return new Promise(resolve =>{
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email
    }

    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid
    }

    async getUserName(callback){
        if(!app.auth().currentUser){
            return null;
        }

        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid).once('value').then(callback);
    }
}

export default new Firebase();