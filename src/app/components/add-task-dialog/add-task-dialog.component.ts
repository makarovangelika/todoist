import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Task, TaskForm } from 'src/app/models';
import { v4 as uuid4 } from "uuid";

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent {
  addTaskForm: FormGroup = new FormGroup<TaskForm>({
    description: new FormControl(null, Validators.required)
  });

  constructor(public ref: DynamicDialogRef,
              public dynamicDialogConfig: DynamicDialogConfig) {}

  addTask() {
    const task = {
      id: uuid4(),
      done: false,
      description: this.addTaskForm.value.description
    };
    this.dynamicDialogConfig.data.addTask(task);
    this.ref.close();
  }
}
