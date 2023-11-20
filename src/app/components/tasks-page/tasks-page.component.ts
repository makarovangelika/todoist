import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}
  
  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

}
