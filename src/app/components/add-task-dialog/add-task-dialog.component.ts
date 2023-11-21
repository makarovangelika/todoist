import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
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
              public ref: DynamicDialogRef) {}

  addTask() {
    const task = {
      description: this.addTaskForm.value.description
    } as Task;
    this.taskService.addTask(task);
    this.ref.close();
  }
}
