import { Component, Signal, WritableSignal, computed, effect, signal } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SortOption, SortTooltip, SortValue, Task, TaskFormData } from 'src/app/models';
import { TaskService } from 'src/app/services/task.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { getSortOptionByValue, getSortOptions } from 'src/app/constants';
import { SortTasksService } from 'src/app/services/sort-tasks.service';
import { FilterService } from 'src/app/services/filter.service';
import { AdditionalFiltersComponent } from '../additional-filters/additional-filters.component';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { v4 as uuid4 } from "uuid";

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

  sortTooltip: Signal<SortTooltip> = computed(() => {
    return {
      deadline: this.sortOption().value === SortValue.deadline ? "Отменить сортировку" : "Сортировать",
      priority: "Сортировать",
      category: this.sortOption().value === SortValue.category ? "Отменить сортировку" : "Сортировать"
    }
  });
  
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
    this.ref = this.dialogService.open(TaskDialogComponent, {
      dismissableMask: true,
      modal: true,
      keepInViewport: true,
      header: 'Новая задача',
      data: {
        taskFormData: {
          description: null,
          deadline: null,
          priority: null,
          category: null
        },
        buttonLabel: "Добавить"
      }
    });
    this.ref.onClose.subscribe((taskFormData: TaskFormData) => {
      if (taskFormData) {
        this.addTask({
          ...taskFormData,
          id: uuid4(),
          done: false
        });
      }
    })
  }

  addTask = (task: Task) => {
    this.tasks.update((tasks: Task[]) => {
      tasks.push(task);
      return tasks;
    })
  }

  openEditDialog = (task: Task) => {
    this.ref = this.dialogService.open(TaskDialogComponent, {
      dismissableMask: true,
      modal: true,
      keepInViewport: true,
      header: 'Изменение задачи',
      data: {
        taskFormData: {
          description: task.description,
          deadline: task.deadline ? new Date(task.deadline) : null,
          priority: task.priority,
          category: task.category
        },
        buttonLabel: "Сохранить"
      }
    });
    this.ref.onClose.subscribe((taskFormData: TaskFormData) => {
      if (taskFormData) {
        this.updateTask(task.id, taskFormData);
      }
    })
  }

  updateTask = (editedTaskId: string, updateTaskData: TaskFormData) => {
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
    if (this.sortOption().value !== SortValue.deadline) {
      this.sortOption.set(getSortOptionByValue(SortValue.deadline));
      if (this.sortPriorityIcon !== 'pi pi-sort') {
        this.sortPriorityIcon = 'pi pi-sort';
      }
    }
    else if (this.sortOption().value === SortValue.deadline) {
      this.sortOption.set(getSortOptionByValue(SortValue.default));
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
    if (this.sortOption().value === SortValue.priorityDown || this.sortOption().value === SortValue.priorityUp) {
      this.sortOption.set(getSortOptionByValue(SortValue.default));
      this.sortPriorityIcon = "pi pi-sort"
    }
  }
  triggerSortByCategory() {
    if (this.sortOption().value !== SortValue.category) {
      this.sortOption.set(getSortOptionByValue(SortValue.category));
      if (this.sortPriorityIcon !== 'pi pi-sort') {
        this.sortPriorityIcon = 'pi pi-sort';
      }
    }
    else if (this.sortOption().value === SortValue.category) {
      this.sortOption.set(getSortOptionByValue(SortValue.default));
    }
  }

  openAdditionalFilters = () => {
    this.ref = this.dialogService.open(AdditionalFiltersComponent, {
      dismissableMask: true,
      modal: true,
      keepInViewport: true,
      header: "Фильтры"
    })
  }
  
}
