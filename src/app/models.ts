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
    deadline: string
}
export interface TaskForm {
    description: FormControl<string | null>,
    deadline: FormControl<string | null>
}
export type Error = string | null
export interface UpdateTaskData {
    description: string
}
