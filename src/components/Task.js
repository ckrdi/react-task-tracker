import { FaTimes } from 'react-icons/fa'
const Task = ({ task, onDelete, onToggle }) => {

  return (
    <div className={`${task.reminder ? 'task reminder' : 'task'}`} onDoubleClick={() => { onToggle(task.id) }}>
      <h3>{task.task} <FaTimes onClick={() => onDelete(task.id)} style={{ color: 'red', cursor: 'pointer' }} /></h3>
      <h4>{task.day}</h4>
    </div>
  )
}

export default Task