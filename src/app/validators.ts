import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Category } from "./models";

export function categoryNameValidator(categories: Category[], editedCategory: Category): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const nameExist = categories.some(category => {
            if (!control.value || (editedCategory.name && category.name.toLowerCase() === editedCategory.name.toLowerCase())) {
                return false;
            }
            return category.name.toLowerCase() === control.value.toLowerCase();
        });
        return nameExist ? { existedName: { value: control.value }} : null;
    }
}