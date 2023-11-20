export interface User {
    email: string,
    password: string,
    tasks?: Task[]
}
export interface Task {
    done: boolean,
    description: string
}