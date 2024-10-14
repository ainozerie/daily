export type Task = {
    id: string;
    label: string;
    checkpoints: Checkpoint[];
}

export type Checkpoint = {
    date: string;
    checked: boolean;
}