import { Component, Signal, WritableSignal, computed, effect, signal } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SortOption, SortValue, Task, UpdateTaskData } from 'src/app/models';
import { TaskService } from 'src/app/services/task.service';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { getSortOptionByValue, getSortOptions } from 'src/app/constants';
import { SortTasksService } from 'src/app/services/sort-tasks.service';
import { FilterService } from 'src/app/services/filter.service';

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
    return this.sortTasksService.sort(this.tasks(), this.sortOption());
  })

  filteredTasks: Signal<Task[]> = computed(() => {
    return this.filterService.filter(this.sortedTasks());
  })

  ref: DynamicDialogRef | undefined;
  sidebarVisible = false;
  sortOption: WritableSignal<SortOption> = signal(getSortOptionByValue(SortValue.default));
  sortOptions: SortOption[] = getSortOptions();
  sortTooltip = {
    deadline: "Сортировать",
    priority: "Сортировать",
    category: "Сортировать"
  };
  sortPriorityItems: MenuItem[];
  sortPriorityIcon = 'pi pi-sort';

  constructor(private taskService: TaskService,
              public dialogService: DialogService,
              private sortTasksService: SortTasksService,
              private filterService: FilterService,
              private confirmationService: ConfirmationService) {
                effect(() => {
                  this.taskService.updateTasks(this.tasks());
                });
                 this.sortPriorityItems = [{
                  label: "По возрастанию",
                  icon: " pi pi-sort-up",
                  command: () => {
                    this.triggerSortByPriorityUp();
                  }
                 },
                {
                  label: "По убыванию",
                  icon: "pi pi-sort-down",
                  command: () => {
                    this.triggerSortByPriorityDown();
                  }
                },
                {
                  label: "Отменить",
                  icon: "pi pi-times",
                  command: () => {
                    this.cancelSortByPriority();
                  }
                }]
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
      this.sortTooltip.deadline = "Отменить сортировку";
    }
    else if (this.sortOption().value === SortValue.deadline) {
      this.sortOption.set(getSortOptionByValue(SortValue.default));
      this.sortTooltip.deadline = "Сортировать";
    }
  }
  triggerSortByPriorityUp() {
    this.sortOption.set(getSortOptionByValue(SortValue.priorityUp));
    this.sortPriorityIcon = "pi pi-sort-up";
  }
  triggerSortByPriorityDown() {
    this.sortOption.set(getSortOptionByValue(SortValue.priorityDown));
    this.sortPriorityIcon = "pi pi-sort-down";
  }
  cancelSortByPriority() {
    this.sortOption.set(getSortOptionByValue(SortValue.default));
    this.sortPriorityIcon = "pi pi-sort"
  }
  triggerSortByCategory() {
    if (this.sortOption().value === SortValue.default) {
      this.sortOption.set(getSortOptionByValue(SortValue.category));
      this.sortTooltip.category = "Отменить сортировку";
    }
    else if (this.sortOption().value === SortValue.category) {
      this.sortOption.set(getSortOptionByValue(SortValue.default));
      this.sortTooltip.category = "Сортировать";
    }
  }
  
}
