import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { getPriorityOptions, getStatusOptions } from 'src/app/constants';
import { Category, FilterForm, Status } from 'src/app/models';
import { FilterService } from 'src/app/services/filter.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-additional-filters',
  templateUrl: './additional-filters.component.html',
  styleUrls: ['./additional-filters.component.scss']
})
export class AdditionalFiltersComponent implements OnInit {
  filterForm: FormGroup<FilterForm> = new FormGroup<FilterForm>({
    status: new FormControl(Status.all),
    deadlineFrom: new FormControl(null),
    deadlineTo: new FormControl(null),
    priority: new FormControl(null),
    category: new FormControl(null)
  })

  statusOptions = getStatusOptions();
  priorities = getPriorityOptions();
  userCategories: Category[] = [{
    name: "Без категории"
  }];

  constructor(private ref: DynamicDialogRef,
              private filterService: FilterService,
              private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().forEach(task => {
      if (task.category) {
        if (!this.userCategories?.some(category => category.name === task.category?.name)) {
          this.userCategories.push(task.category)
        }
      }
    })
    this.filterForm.patchValue({
      status: this.filterService.filters().status,
      deadlineFrom: this.filterService.filters().deadlineFrom,
      deadlineTo:  this.filterService.filters().deadlineTo,
      priority: this.filterService.filters().priority,
      category: this.filterService.filters().category
    })
  }

  filter() {
    const filters = {
      deadlineFrom: this.filterForm.value.deadlineFrom || null,
      deadlineTo: this.filterForm.value.deadlineTo || null,
      status: this.filterForm.value.status || null,
      priority: this.filterForm.value.priority || null,
      category: this.filterForm.value.category || null,
    }
    this.filterService.updateFilters(filters);
    this.ref.close();
  }
  
  clearFilters() {
    this.filterService.clearFilters();
    this.filterForm.reset();
  }
}
