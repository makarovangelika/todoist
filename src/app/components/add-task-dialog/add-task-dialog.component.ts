import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Task } from 'src/app/models';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent {
  addTaskForm = this.fb.group({
    description: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private taskService: TaskService,
              public ref: DynamicDialogRef,
              public dynamicDialogConfig: DynamicDialogConfig) {}

  addTask() {
    const task = {
      done: false,
      description: this.addTaskForm.value.description
    } as Task;
    this.dynamicDialogConfig.data.addTask(task);
    this.ref.close();
  }
}
