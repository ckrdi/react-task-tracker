import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState, useEffect } from 'react'
import AddTask from './components/AddTask'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const getTasks = async () => {
      const getData = await fetchTasks()
      setTasks(getData)
    }
    getTasks()
  }, [])
  // fetch tasks from server
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }
  // show the add task form
  const showAdd = () => {
    setShowAddTask(!showAddTask)
  }
  // add task to the app
  const addTask = async (task) => {
    const id = Date.now()
    const newTasks = { id, ...task }
    const newList = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(newTasks)
    })
    const newData = await newList.json();

    setTasks([...tasks, newData])
  }
  // delete task in the app
  const delTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }
  // toggle for set reminder
  const togRemind = async (id) => {

    const fetchTask = await fetch(`http://localhost:5000/tasks/${id}`)
    const singleTask = await fetchTask.json()
    const updatedTask = { ...singleTask, reminder: !singleTask.reminder }

    const updateTask = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(updatedTask)
    })
    const newUpdatedTasks = await updateTask.json()
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: newUpdatedTasks.reminder } : task))
  }
  return (
    <div className="container">
      <Header onAdd={showAdd} showAddTask={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={delTask} onToggle={togRemind} /> : 'There is no task'}
    </div>
  );
}

export default App;
