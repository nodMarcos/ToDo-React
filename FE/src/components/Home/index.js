import React,{useState, useEffect} from "react"
import './styles.css'
import {FiPlus,FiPower,FiTrash2, FiEdit2} from 'react-icons/fi'
import {useHistory} from "react-router-dom"
import url from "../../url/api.js"
import axios from "axios"

function Home(){
    let name = localStorage.getItem('Name')
    let id = localStorage.getItem("ID")
    const history = useHistory()
    const [tasks, setTasks] = useState([])
    
    if(!id){
        alert("You shall not pass!")
        window.location.href ="/"
    }
    console.log(name,id)

    function addTasks(){
        history.push('/Tasks')
    }
   
    async function handleDeleteTask(taskId){
        console.log(taskId, id)
        try{
          await axios.delete(`${url.url_api}Tasks/${taskId}/${id}`) 
          .then(res=>{
              alert('Task excluded successfully!')              
              window.location.reload()
          }) 
        }
        catch(err){
            console.log(err)
        }

    }
   
    async function handleChangeStatus(taskId, status){
        console.log(id, taskId, status)
        let dados={
            userId:id,
            taskId,
            status
        }
        try{
            await axios.put(`${url.url_api}Tasks`,dados)
            .then(res=>{
                window.location.reload()
            })
        }
        catch(err){
            console.log(err)
        }
        
    }

useEffect(() =>{   
    axios.get(`${url.url_api}Tasks/${id}`)
    .then(res =>{
            console.log(res.data.tasks)
            setTasks(res.data.tasks)
    })
},[id])

console.log(tasks)

return(
    <div className="home-container">
        <header>
        <span>Welcome {name}!</span>
        <button className='button' type="button" onClick={addTasks}><FiPlus size={18} color='#fff'/></button>
        <button className='button'type="button" onClick={()=> localStorage.clear(history.push('/'))}><FiPower size={18} color='#fff'/></button>
        </header>
        <h1>These are yours tasks: </h1>
        <ul>                
            {tasks.map(task=>(
                <li key={task.taskId}>
                    <strong>TITLE:</strong>
                    <p>{task.title}</p>

                    <strong>DESCRIPTION:</strong>
                    <p>{task.description}</p>

                    <strong>STATUS:</strong>
                    {task.status === 0 ?
                    <p>Pendent</p> 
                    :
                    <p>Done!</p>
                    }
                    <button className='button1' type='button' onClick={()=> handleDeleteTask(task.taskId)}>
                        <FiTrash2 size={20} color='#fff'/>
                    </button>              
                    <button className='button2' type='button' onClick={()=>handleChangeStatus(task.taskId, task.status)}>
                        <FiEdit2 size={20} color='#fff'/>
                    </button>
                </li>
            ))}
        </ul>       
    </div>
)
}

export default Home