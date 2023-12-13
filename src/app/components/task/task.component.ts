import { Component, Input } from '@angular/core';
import { PRIORITY_LABELS } from 'src/app/constants';
import { Task } from 'src/app/models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task!: Task;
  @Input() changeStatus: (taskId: string) => void = () => {};
  @Input() openEditDialog: (task: Task) => void = () => {};
  @Input() confirmDelete: (taskId: string) => void = () => {};

  priorityLabels = PRIORITY_LABELS;

  constructor() {}
}
