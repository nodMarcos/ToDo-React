import React, { useState } from "react"
import Axios from "axios"
import url from "../../url/api.js"
import './styles.css'
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'

function Tasks(){
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const id = localStorage.getItem("ID")
    const history = useHistory()

    function handleTitle(e){
        e.preventDefault()
        setTitle(e.target.value)
    }
    function handleDesc(e){
        e.preventDefault()
        setDesc(e.target.value)
    }

    function tryAdd(e)
    {
        e.preventDefault()
        if(title.length === 0){
            alert("Todos os campos precisam ser preenchidos!!")
        }else{
            console.log(title, desc)
            let dados = {
                title,
                description:desc,
                userId:id
            }
            Axios.post(`${url.url_api}Tasks`, dados)
            .then((res) =>{
                if(res){
                    history.push('/Home')
                }
            }).catch((err) =>{
                console.log(err)
            })
        }

    }

    return(
        <div className="Tasks-container">
            <div className="content">
            <section>
                <h1>Tasks Registration</h1>
                <Link to='/Home' className='link'><FiArrowLeft size={18} color='#05e5fa'/> Back</Link>
            </section>
            <form onSubmit={tryAdd}>
                <input placeholder='Title' type="text" onChange={handleTitle}/>
                <textarea placeholder='Description(optional)' onChange={handleDesc}/>
                <button className='button' type="submit">Add Task</button>
            </form>
            </div>
        </div>
    )
}


export default Tasks