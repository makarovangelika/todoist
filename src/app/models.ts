import { FormControl } from "@angular/forms"

export interface User {
    email: string,
    password: string
}
export interface UserForm {
    email: FormControl<string | null>,
    password: FormControl<string | null>
}
export interface Task {
    id: string,
    done: boolean,
    description: string,
    deadline: string,
    priority: Priority
}
export interface TaskForm {
    description: FormControl<string | null>,
    deadline: FormControl<Date | null>,
    priority: FormControl<Priority | null>
}
export enum Priority {
    low = "low",
    medium = "medium",
    high = "high"
}

export type Error = string | null

export interface UpdateTaskData {
    description: string
}
