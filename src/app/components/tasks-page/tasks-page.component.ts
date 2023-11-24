import { Component, WritableSignal, effect, signal } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Task, UpdateTaskData } from 'src/app/models';
import { TaskService } from 'src/app/services/task.service';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class TasksPageComponent {
  tasks: WritableSignal<Task[]> = signal(this.taskService.getTasks());
  ref: DynamicDialogRef | undefined;

  constructor(private taskService: TaskService,
              public dialogService: DialogService,
              private confirmationService: ConfirmationService) {
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
        addTask: this.addTask
      }
    });
  }

  addTask = (task: Task) => {
    this.tasks.update((tasks: Task[]) => {
      tasks.push(task);
      return tasks;
    })
  }

  openEditDialog = (task: Task) => {
    this.ref = this.dialogService.open(EditTaskDialogComponent, {
      dismissableMask: true,
      modal: true,
      keepInViewport: true,
      header: 'Изменение задачи',
      data: {
        task: task,
        updateTask: this.updateTask
      }
    });
  }

  updateTask = (editedTaskId: string, updateTaskData: UpdateTaskData) => {
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

  deleteTask = (taskId: string) => {
    this.tasks.update(tasks => {
      return tasks.filter(task => {
        return task.id !== taskId;
      })
    })
  }

  confirmDelete = (taskId: string) => {
    this.confirmationService.confirm({
      message: 'Вы уверены, что хотите удалить задачу?',
      header: 'Подтвердите удаление задачи',
      acceptLabel: 'Удалить',
      rejectLabel: 'Отмена',
      acceptButtonStyleClass: 'accept-delete-button confirm-delete-button',
      rejectButtonStyleClass: 'confirm-delete-button',
      defaultFocus: 'none',
      accept: () => {
        this.deleteTask(taskId);
      }
    })
  }

  changeStatus = (taskId: string) => {
    this.tasks.update(tasks => {
      return tasks.map(task => {
        if (task.id === taskId) {
          task = {
            ...task,
            done: !task.done
          }
        }
        return task;
      });
    });
  }
}
