import PropTypes from 'prop-types'
import './taskitem.css'
import { useState } from 'react'

export default function TaskItem({id, title, taskState, onTaskUpdate, onDeleteTask}) {
    const [isEditing, setIsEditing] = useState(false)
    const [editableTitle, setEditableTitle] = useState(title)

    const onTitleChange = (event) => {
        const newTitle = event.target.value
        setEditableTitle(newTitle);
        onTaskUpdate(id, newTitle, taskState)
    }

    const onKeyPress = (event) => {
        if(event.key === 'Enter') {
            setIsEditing(false)
            if (editableTitle.lenght === 0) {
                onDeleteTask(id)
            }
        }
    }

    const onTaskStateChange = (event) => {
        onTaskUpdate(id, title, event.target.value)
    }

    if(isEditing) {
        return (
            <div className='task-item'>
                <input type="text" value={editableTitle} onChange={onTitleChange} onKeyPress={onKeyPress}/>
            </div>
        )
    } else {
        return(
        <div className='task-item'> 
            <div onClick={(e) => setIsEditing(true)}>{editableTitle}</div>
                <select className='selectItem' onChange={onTaskStateChange} value={taskState}>
                    <option value="Pendente">Pendente</option>
                    <option value="Fazendo">Fazendo</option>
                    <option value="Concluido">Concluido</option>
                </select>
        </div>   
        )
}
    }


TaskItem.prototype = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    taskSate: PropTypes.string.isRequired
}