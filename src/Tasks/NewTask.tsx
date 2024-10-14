import { useState } from 'react'
import { Checkpoint, Task } from '../taskService/task'
import './tasks.css'
import { createTask } from '../taskService/taskService';

export default function NewTask() {
    const[newTask, setNewTask] = useState<Task>({
        id: '',
        label: '',
        checkpoints: []
    });

    const inputHandler = (event: any) => {
        setNewTask({...newTask, [event.target.name]: event.target.value});
    }

    const checkpointsHanlder = (event: any) => {
        const checkpoints: Checkpoint[] = [];
        let index = 0;
        while (index < +event.target.value) {
            checkpoints.push({
                checked: false,
                date: JSON.stringify(new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * index)).split('T')[0].slice(1)
            });
            index++;
        }
        setNewTask({...newTask, checkpoints: checkpoints});
    }

    const isTaskValid = () => {
        return newTask.label && newTask.checkpoints.length > 0;
    }

    const submitHandler = () => {
        if (isTaskValid()) {
            createTask({...newTask, id: Date.now().toString()});
        }
    }
    
    return (
        <div className="new-task">
            <label htmlFor="label">What do you want to achieve:</label>
            <input type="text" name="label" id="label" placeholder="Label" onChange={inputHandler}/>
            <label htmlFor="checkpoints">For how long:</label>
            <input type="number" name="checkpoints" id="checkpoints" placeholder="Number of days" min={1} onChange={checkpointsHanlder}/>
            <button disabled={!isTaskValid()} onClick={submitHandler}>Create new goal</button>
        </div>
    )
}
