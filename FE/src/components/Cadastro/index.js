import React, { useState } from "react";
import './styles.css'
import { Link, useHistory } from "react-router-dom";
import axios from "axios"
import url from "../../url/api"
import { FiArrowLeft, FiEye } from 'react-icons/fi'

function Cadastro() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [conf_pass, setConfPass] = useState("")
    const [typePassword, setTypePassword] = useState('password')
    const [visibility, setVisibility] = useState(false)
    const history = useHistory()

    function handleClick(e){
        if(visibility === false){
            setVisibility(true)
            setTypePassword('text')            
        }
        else{
            setVisibility(false)
            setTypePassword('password')
        }
    }

    async function tryCadastro(e) {
        e.preventDefault()

        console.log(name, email, password)
        if (name.length === 0 || email.length === 0 || password.length === 0 || conf_pass.length === 0) {
            alert("Todos os campos precisam ser preenchidos!")
        } else if (password !== conf_pass) {
            alert("Senhas diferentes!")
        } else if(password.length < 8){
            alert('Sua senha precisa de 8 caracteres ou mais!')
        }
        else {
            let dados = {
                name,
                email,
                password
            }
            await axios.post(`${url.url_api}Cadastro`, dados)
                .then((res) => {
                    if (res) {
                        localStorage.setItem("Name", res.data.name)
                        localStorage.setItem("ID", res.data.id)
                        history.push('/Home')
                    }
                }).catch((err) => {
                    if (err) {
                        console.log(err)
                        alert(err)
                    }
                })
        }
    }

    return (
        <div className="cadastro-container">
            <div className="content">
                <section>
                    <h1>Registration Form</h1>
                    <Link className="link" to="/"><FiArrowLeft size={16} color='#05e5fa' /> Back</Link>
                </section>
                <form onSubmit={tryCadastro}>
                    <input placeholder='Name' type="text" value={name} onChange={e => setName(e.target.value)} />
                    <input placeholder='Email' type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input placeholder='Password' type={typePassword} value={password} onChange={e => setPassword(e.target.value)}/>
                    <input placeholder='Confirm your password' type={typePassword} value={conf_pass} onChange={e => setConfPass(e.target.value)} />
                    <FiEye className='eye' size={24} color='grey' onClick={handleClick}/>
                    <button className='button' type="submit">Cadastrar</button>
                    
                </form>
            </div>
        </div>
    )
}

export default Cadastro