import { Task } from "./task";

type Storage = {
    tasks: Task[];
}

const APP_KEY = 'daily-app';

const createTask = (task: Task): Task => {
    let store: Storage = getFromStorage();
    if (store) {
        if (store.tasks) {
            store.tasks.push(task);
        } else {
            store.tasks = [task];
        }
    } else {
        store = {
            tasks: [task]
        }
    }
    saveToStorage(store);
    return task;
}

const updateTask = (id: string, task: Task): Task => {
    let store: Storage = getFromStorage();
    const index = store.tasks.findIndex(t => t.id === id);
    store.tasks[index] = task;
    saveToStorage(store);
    return task;

}

const getTasks = (): Task[] => {
    const store: Storage = getFromStorage();
    return store && store.tasks ? store.tasks : [];
}

const getTask = (id: string): Task | undefined => {
    const store: Storage = getFromStorage();
    const index = store.tasks ? store.tasks.findIndex(t => t.id === id) : -1;
    return index >= 0 ? store.tasks[index] : undefined;
}

const saveToStorage = (data: any): void => {
    localStorage.setItem(APP_KEY, JSON.stringify(data));
}

const getFromStorage = (): Storage => {
    const data: string | null = localStorage.getItem(APP_KEY);
    return data ? JSON.parse(data) : undefined;
}

export {createTask, getTasks, updateTask, getTask}