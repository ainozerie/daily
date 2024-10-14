import { useEffect, useState } from "react"
import { Task } from "../taskService/task"
import { getTasks } from "../taskService/taskService";
import { Link } from "react-router-dom";

function TaskItem({id, label, score}: {id: string, label: string, score: number}) {
    return <Link to={id} className="task-item">
        <span>{label}</span>
        <span>{score}%</span>
    </Link>
}

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        setTasks(getTasks());
    }, [])

    const taskListing = tasks.map(t => {
        return <TaskItem key={t.id} id={t.id} label={t.label} score={Math.round(t.checkpoints.filter(cp => cp.checked).length / t.checkpoints.length * 100)}/>
    })

    return (
        <div className="task-list">
            {tasks.length > 0 && taskListing}
            {tasks.length === 0 && <p>Oops, no tasks...</p>}
        </div>
    )
}
