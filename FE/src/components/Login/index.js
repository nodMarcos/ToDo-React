import React,{useState} from 'react';
import {useHistory} from "react-router-dom"
import url from "../../url/api.js"
import axios from 'axios';
import './styles.css'

function Login(){
const [email, setEmail] = useState("")
const [password, setPassword] = useState("") 
const history = useHistory()

function register(){
    history.push('/Cadastro')
}
  
  function tryLogin(e){
    e.preventDefault()    
    console.log(email, password)
    if(email.length === 0||password.length === 0){
      alert("Todos os campos precisam ser preenchidos")
    }else{
        console.log(email,password)
        let dados={
          email,
          password
        }
        axios.post(`${url.url_api}Login`,dados)
        .then((res)=>{
          if(res){
            localStorage.setItem("Name", res.data.response.name)
            localStorage.setItem("ID", res.data.response.userId)
            history.push('/Home')
          }
        }).catch((err)=>{
            if(err){
              console.log(err)
            }
        })
      }
   }
  
  return (
    <div className="login-container">
      <section className="form">
      <form onSubmit={tryLogin}>
      <h1>Login</h1>
        <input placeholder='Email' value={email} type="email" onChange={e => setEmail(e.target.value)}/><br/>
        <input placeholder='Password' value={password} type="password" onChange={e => setPassword(e.target.value)}/><br/>
        <button className='button' type="submit">SignIn</button>
        <button className='button' onClick={register}>SignUp</button>
      </form>      
      </section>      
    </div>
  );
}

export default Login