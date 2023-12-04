import { Priority, SortOption, SortValues } from "./models";

export const PRIORITY_LABELS = {
    [Priority.low]: "Низкий",
    [Priority.medium]: "Средний",
    [Priority.high]: "Высокий"
};

export function getOptions() {
    return (Object.keys(PRIORITY_LABELS) as Array<keyof typeof Priority>).map(value => {
        return {
            label: PRIORITY_LABELS[value],
            value: value
        }
    })
}

export const DEFAULT_CATEGORIES = [
    {
        name: "Дом"
    },
    {
        name: " Работа"
    }
]

export const SORT_LABELS = {
    [SortValues.deadline]: "по сроку",
    [SortValues.priority]: "по приоритету",
    [SortValues.category]: "по категории"
}

export function getSortOptions(): SortOption[] {
    return <SortOption[]>(Object.keys(SORT_LABELS) as Array<keyof typeof SortValues>).map(option => {
        return {
            label: SORT_LABELS[option],
            value: option
        }
    })
}