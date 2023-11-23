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
    done: boolean,
    description: string
}
export interface TaskForm {
    description: FormControl<string | null>
}
