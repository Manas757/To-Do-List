import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString =localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])
  

  const saveToLS= () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  const handleEdit=(e,id)=>{
    let newtodo=todos.filter(item=>{
      return item.id===id
    })
    settodo(newtodo[0].todo)
    let newtodos = todos.filter(item=>{
      return item.id!==id
    })
    settodos(newtodos)
    saveToLS()
  }

  const handleDelete=(e,id)=>{
    let newtodos = todos.filter(item=>{
      return item.id!==id
    })
    settodos(newtodos)
    saveToLS()
  }

  const handleAdd=()=>{
    settodos([...todos,{id: uuidv4(), todo, isCompleted:false}])
    settodo("")
    saveToLS()
  }

  const handleChange=(e)=>{
    settodo(e.target.value)

  }

  const handleCheckbox =(e) => {
    let id = e.target.name
    let index= todos.findIndex(item=>{
      return item.id===id
    })
    let newtodos=[...todos]
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos)
    saveToLS()
  }
  
  return (
    <>
    <Navbar/>
    <div className="contain mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[40vw] w-1/2">
    <h1 className='font-bold text-center text-2xl'>iTask - Manage your todos at one place</h1>
      <div className="addTodo my-5 flex flex-col gap-4">
        <h2 className='text-xl font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full bg-white' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800  rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white hover:cursor-pointer'>Add</button>
      </div>
      <input type="checkbox" onChange={toggleFinished} checked={showFinished} />showFinished
      <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>

      <h2 className='text-xl font-bold my-4'>Your Todos</h2>
      <div className='todos'>
      {todos.length ===0 && <div className='m-5'>No Todos to display</div> }
        {todos.map(item=>{
          console.log(item.id)
        return  (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex w-1/2 my-3 justify-between"}>
          <div className='flex gap-5'> 
          <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
            <div className="buttons  flex h-full">
            <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 hover:cursor-pointer'><FaEdit /></button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 hover:cursor-pointer'><AiFillDelete /></button>
            </div>
        </div>
      })}
      </div>
    </div>
    </>
  )
}

export default App
