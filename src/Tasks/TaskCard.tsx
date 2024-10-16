import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Checkpoint, Task } from "../taskService/task";
import { getTask, updateTask } from "../taskService/taskService";
import './tasks.css'
import Icon from "../Icon/Icon";

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
        const numOfElements = Math.floor(availableWidth / 80);
        let availableForGaps = availableWidth - numOfElements * 80;
        let index = 1;
        let gap = availableForGaps / (numOfElements - index);
        while (gap < 4) {
            availableForGaps = availableWidth - (numOfElements - index) * 80;
            gap = availableForGaps / (numOfElements - index - 1);
            index++;
        }
        return `${gap}px`;
    }

    const formateDate = (cp: Checkpoint): string => {
        return cp.date.slice(5).split('-').reverse().join('.');
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
                            return (<span className={checked ? 'passed checkpoint success' : 'passed checkpoint failed'} key={cp.date}>
                                {checked ? <Icon name='check'/> : <Icon name='block'/> }
                                {formateDate(cp)}
                            </span>)
                        } else if (position > 0) {
                            return (<span className={'upcoming checkpoint'} key={cp.date}>
                                <Icon name='lock_open'/> 
                                {formateDate(cp)}
                            </span>)
                        } else {
                            return (<span className={checked ? 'current checkpoint success' : 'current checkpoint'} key={cp.date} onClick={() => toggleCheckpointStatus(index)}>
                                {checked ? <Icon name='check'/> : <Icon name='update'/> }
                                {formateDate(cp)}
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
