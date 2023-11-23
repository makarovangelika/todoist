import { Component, WritableSignal, effect, signal } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Task, TaskForm, UpdateTaskData } from 'src/app/models';
import { TaskService } from 'src/app/services/task.service';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
  providers: [DialogService]
})
export class TasksPageComponent {
  tasks: WritableSignal<Task[]> = signal(this.taskService.getTasks());
  ref: DynamicDialogRef | undefined;

  constructor(private taskService: TaskService,
              public dialogService: DialogService) {
                effect(() => {
                  this.taskService.updateTasks(this.tasks());
                });
              }

  openAddDialog() {
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

  openEditDialog = (task: Task) => {
    this.ref = this.dialogService.open(EditTaskDialogComponent, {
      dismissableMask: true,
      modal: true,
      keepInViewport: true,
      header: 'Изменение задачи',
      data: {
        task: task,
        updateTask: (editedTaskId: string, updateTaskData: UpdateTaskData) => {
          this.tasks.update(tasks => {
            return tasks.map(task => {
              if (task.id === editedTaskId) {
                task = {
                  ...task,
                  ...updateTaskData
                }
              }
              return task;
            });
          });
        }
      }
    });
  }

  changeStatus = (task: Task) => {
    task.done = !task.done;
    this.tasks.set(this.tasks());
  }
}
