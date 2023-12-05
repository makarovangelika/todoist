import { Component, OnInit, Signal, WritableSignal, computed, effect, signal } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SortOption, SortValue, Task, UpdateTaskData } from 'src/app/models';
import { TaskService } from 'src/app/services/task.service';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { ConfirmationService } from 'primeng/api';
import { getSortOptionByValue, getSortOptions } from 'src/app/constants';
import { SortTasksService } from 'src/app/services/sort-tasks.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class TasksPageComponent {
  tasks: WritableSignal<Task[]> = signal(this.taskService.getTasks());
  sortedTasks: Signal<Task[]> = computed(() => {
    if (this.sortOption().value === SortValue.default) {
      return this.tasks();
    }

    return [...this.tasks()].sort((prevTask, nextTask) => {
      switch(this.sortOption().value) {
        case SortValue.deadline:
          return this.sortTasksService.sortByDeadline(prevTask, nextTask);
        case SortValue.priorityUp:
          return this.sortTasksService.sortByPriority(prevTask, nextTask, this.sortOption().value);
        case SortValue.priorityDown:
          return this.sortTasksService.sortByPriority(prevTask, nextTask, this.sortOption().value);
        case SortValue.category:
          return this.sortTasksService.sortByCategory(prevTask, nextTask);
        default:
          return 0;
      }
    })
  })
  ref: DynamicDialogRef | undefined;
  sidebarVisible = false;
  sortOption: WritableSignal<SortOption> = signal(getSortOptionByValue(SortValue.default));
  sortOptions: SortOption[] = getSortOptions();
  sortTooltip = "Сортировать";

  constructor(private taskService: TaskService,
              public dialogService: DialogService,
              private sortTasksService: SortTasksService,
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
      header: 'Удалить задачу?',
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

  toggleSidebarVisibility = () => {
    this.sidebarVisible = !this.sidebarVisible;
  }

  triggerSortByDeadline() {
    if (this.sortOption().value === SortValue.default) {
      this.sortOption.set(getSortOptionByValue(SortValue.deadline));
      this.sortTooltip = "Отменить сортировку";
    }
    else if (this.sortOption().value === SortValue.deadline) {
      this.sortOption.set(getSortOptionByValue(SortValue.default));
      this.sortTooltip = "Сортировать";
    }
  }
}
