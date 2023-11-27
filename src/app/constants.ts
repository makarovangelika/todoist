import { Priority } from "./models";

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