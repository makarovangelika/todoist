import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task!: Task;
  @Input() changeStatus!: (task: Task) => void;
  @Input() openEditDialog!: (task: Task) => void;
}
