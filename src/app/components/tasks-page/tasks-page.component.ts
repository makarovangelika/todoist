import { Component } from '@angular/core';
import { Task } from 'src/app/models';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent {
  tasks: Task[] = [];

  constructor() {}


}
