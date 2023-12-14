import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PRIORITY_LABELS } from 'src/app/constants';
import { Task } from 'src/app/models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  @Output() readonly taskChecked = new EventEmitter<string>();
  @Output() readonly editButtonClicked = new EventEmitter<Task>();
  @Output() readonly deleteButtonClicked = new EventEmitter<string>();

  priorityLabels = PRIORITY_LABELS;

  constructor() {}

  changeStatus(taskId: string) {
    this.taskChecked.emit(taskId);
  }
  openEditDialog(task: Task) {
    this.editButtonClicked.emit(task);
  }
  confirmDelete(taskId: string) {
    this.deleteButtonClicked.emit(taskId);
  }
}
