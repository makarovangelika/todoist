import { Priority, SortOption, SortValue } from "./models";

export const PRIORITY_LABELS = {
    [Priority.low]: "Низкий",
    [Priority.medium]: "Средний",
    [Priority.high]: "Высокий"
};

export const PRIORITY_WEIGHTS  = new Map<string, number>();

export function getOptions() {
    return (Object.keys(PRIORITY_LABELS) as Array<keyof typeof Priority>).map(value => {
        return {
            label: PRIORITY_LABELS[value],
            value: value
        }
    })
}

getOptions().forEach(option => {
    switch (option.value) {
        case Priority.low:
            PRIORITY_WEIGHTS.set(option.value, 1);
            break;
        case Priority.medium:
            PRIORITY_WEIGHTS.set(option.value, 2);
            break;
        case Priority.high:
            PRIORITY_WEIGHTS.set(option.value, 3);
    }
})

export const DEFAULT_CATEGORIES = [
    {
        name: "Дом"
    },
    {
        name: " Работа"
    }
]

export const SORT_LABELS = {
    [SortValue.default]: "По умолчанию",
    [SortValue.deadline]: "Сначала срочные",
    [SortValue.priorityUp]: "По возрастанию приоритета",
    [SortValue.priorityDown]: "По убыванию приоритета",
    [SortValue.category]: "По категории"
}

export function getSortOptions(): SortOption[] {
    return <SortOption[]>(Object.keys(SORT_LABELS) as Array<keyof typeof SortValue>).map(option => {
        return {
            label: SORT_LABELS[option],
            value: option
        }
    })
}