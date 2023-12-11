import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { getPriorityOptions, getStatusOptions } from 'src/app/constants';
import { FilterForm } from 'src/app/models';
import { FilterService } from 'src/app/services/filter.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-additional-filters',
  templateUrl: './additional-filters.component.html',
  styleUrls: ['./additional-filters.component.scss']
})
export class AdditionalFiltersComponent implements OnInit {
  filterForm: FormGroup = new FormGroup<FilterForm>({
    status: new FormControl(this.filterService.filters().status),
    deadlineFrom: new FormControl(this.filterService.filters().deadlineFrom),
    deadlineTo: new FormControl(this.filterService.filters().deadlineTo),
    priority: new FormControl(this.filterService.filters().priority),
    category: new FormControl(this.filterService.filters().category)
  })

  statusOptions = getStatusOptions();
  priorities = getPriorityOptions();
  userCategories: string[] = ["Без категории"];

  constructor(private ref: DynamicDialogRef,
              private filterService: FilterService,
              private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().forEach(task => {
      if (task.category) {
        if (!this.userCategories?.includes(task.category.name)) {
          this.userCategories.push(task.category.name)
        }
      }
    })
  }

  filter() {
    const filters = {
      deadlineFrom: this.filterForm.value.deadlineFrom,
      deadlineTo: this.filterForm.value.deadlineTo,
      status: this.filterForm.value.status,
      priority: this.filterForm.value.priority,
      category: this.filterForm.value.category
    }
    this.filterService.updateFilters(filters);
    this.ref.close();
  }
}
