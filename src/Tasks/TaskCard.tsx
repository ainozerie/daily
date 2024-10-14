import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Checkpoint, Task } from "../taskService/task";
import { getTask, updateTask } from "../taskService/taskService";
import './tasks.css'

export default function TaskCard() {
    const {id} = useParams();
    const [task, setTask] = useState<Task | undefined>(undefined);
    const today = JSON.stringify((new Date())).split('T')[0].slice(1);

    useEffect(() => {
        if (id) {
            setTask(getTask(id));
        }
    }, []);

    const getCheckpointPosition = (cp: Checkpoint) => {
        if (new Date(cp.date) < new Date(today)) {
            return -1;
        } else if (new Date(cp.date) > new Date(today)) {
            return 1;
        }
        return 0;
    }

    const resolveCheckpointStatus = (cp: Checkpoint) => {
        return cp.checked;
    }

    const toggleCheckpointStatus = (index: number) => {
        if (id && task) {
            const updatedTask = {...task};
            updatedTask.checkpoints[index].checked = !task.checkpoints[index].checked;
            setTask(updateTask(id, updatedTask));
        }
    }

    const calculateGap = (): string => {
        const availableWidth = screen.width * 0.9;
        console.log(availableWidth)
        const numOfElements = Math.floor(availableWidth / 80);
        console.log(numOfElements)
        const availableForGaps = availableWidth - numOfElements * 80;
        console.log(availableForGaps)
        let gap = availableForGaps / (numOfElements - 1);
        console.log(gap)

        return `${gap}px`;
    }

    if (task) {
        return (
            <div className="task-card">
                <h1 className="label">{task.label} {task.checkpoints.filter(cp => cp.checked).length}/{task.checkpoints.length}</h1>
                <div className="checkpoints" style={{'gap': calculateGap()}}>
                    {task.checkpoints.map((cp, index) => {
                        const position = getCheckpointPosition(cp);
                        const checked = resolveCheckpointStatus(cp);
                        if (position < 0) {
                            return (<span title={`Failed on ${cp.date}`} className={checked ? 'passed checkpoint success' : 'passed checkpoint failed'} key={cp.date}>
                                {checked ? <span className="material-symbols-outlined icon">check</span> : <span className="material-symbols-outlined icon">block</span>}
                                {cp.date.slice(5).split('-').reverse().join('.')}
                            </span>)
                        } else if (position > 0) {
                            return (<span title={`Upcoming on ${cp.date}`}  className={'upcoming checkpoint'} key={cp.date}>
                                <span className="material-symbols-outlined icon">hourglass_top</span>
                                {cp.date.slice(5).split('-').reverse().join('.')}
                            </span>)
                        } else {
                            return (<span title={checked ? 'Finished today' : 'Waiting today'} className={checked ? 'current checkpoint success' : 'current checkpoint'} key={cp.date} onClick={() => toggleCheckpointStatus(index)}>
                                {checked ? <span className="material-symbols-outlined icon">check</span> : <span className="material-symbols-outlined icon">rocket_launch</span>}
                                {cp.date.slice(5).split('-').reverse().join('.')}
                            </span>)
                        }
                    })}
                </div>
            </div>
        )
    } else {
        return <p>Loading...</p>
    }

}
