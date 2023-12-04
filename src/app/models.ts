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
    priority: Priority,
    category: Category | null
}
export interface TaskForm {
    description: FormControl<string | null>,
    deadline: FormControl<Date | null>,
    priority: FormControl<Priority | null>,
    category: FormControl<Category | null>
}
export enum Priority {
    low = "low",
    medium = "medium",
    high = "high"
}

export type CustomError = string | null

export interface UpdateTaskData {
    description: string
}

export interface Category {
    name: string;
}
export interface CategoryForm {
    name: FormControl<string | null>
}
export interface UpdateCategoryData {
    name: string
}

export enum SortValues {
    deadline = "deadline",
    priority = "priority",
    category = "category"
}
export interface SortOption {
    label: string,
    value: SortValues
}
