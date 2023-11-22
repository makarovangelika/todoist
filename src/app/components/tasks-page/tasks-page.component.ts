import { Component, OnInit, WritableSignal, effect, signal } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Task } from 'src/app/models';
import { TaskService } from 'src/app/services/task.service';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
  providers: [DialogService]
})
export class TasksPageComponent implements OnInit {
  tasks: WritableSignal<Task[]> = signal([]);
  ref: DynamicDialogRef | undefined;

  constructor(private taskService: TaskService,
              public dialogService: DialogService) {
                effect(() => {
                  this.taskService.updateTasks(this.tasks());
                })
              }
  
  ngOnInit(): void {
    this.tasks.set(this.taskService.getTasks());
  }

  show() {
    this.ref = this.dialogService.open(AddTaskDialogComponent, {
      dismissableMask: true,
      modal: true,
      keepInViewport: true,
      header: 'Новая задача',
      data: {
        addTask: (task: Task) => {
          this.tasks.update((tasks: Task[]) => {
            tasks.push(task);
            return tasks;
          })
        }
      }
    });
  }
}
