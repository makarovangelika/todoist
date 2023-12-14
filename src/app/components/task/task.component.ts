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
  @Input() openEditDialog: (task: Task) => void = () => {};
  @Input() confirmDelete: (taskId: string) => void = () => {};

  priorityLabels = PRIORITY_LABELS;

  constructor() {}

  changeStatus(taskId: string) {
    this.taskChecked.emit(taskId);
  }
}
