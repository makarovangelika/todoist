import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { getStatusOptions } from 'src/app/constants';
import { FilterForm } from 'src/app/models';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-additional-filters',
  templateUrl: './additional-filters.component.html',
  styleUrls: ['./additional-filters.component.scss']
})
export class AdditionalFiltersComponent {
  filterForm: FormGroup = new FormGroup<FilterForm>({
    status: new FormControl(this.filterService.filters().status),
    deadlineFrom: new FormControl(this.filterService.filters().deadlineFrom),
    deadlineTo: new FormControl(this.filterService.filters().deadlineTo)
    //priority: new FormControl(null),
    //category: new FormControl(null)
  })

  statusOptions = getStatusOptions();

  constructor(private ref: DynamicDialogRef,
              private filterService: FilterService) {}

  filter() {
    const filters = {
      deadlineFrom: this.filterForm.value.deadlineFrom,
      deadlineTo: this.filterForm.value.deadlineTo,
      status: this.filterForm.value.status
    }
    this.filterService.updateFilters(filters);
    this.ref.close();
  }
}
