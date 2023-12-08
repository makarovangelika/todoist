import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FilterForm } from 'src/app/models';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-additional-filters',
  templateUrl: './additional-filters.component.html',
  styleUrls: ['./additional-filters.component.scss']
})
export class AdditionalFiltersComponent {
  filterForm: FormGroup = new FormGroup<FilterForm>({
    //status: new FormControl(null),
    deadlineFrom: new FormControl(null),
    deadlineTo: new FormControl(null)
    //priority: new FormControl(null),
    //category: new FormControl(null)
  })

  constructor(private ref: DynamicDialogRef,
              private filterService: FilterService) {}

  filter() {
    const filters = {
      deadlineFrom: this.filterForm.value.deadlineFrom,
      deadlineTo: this.filterForm.value.deadlineTo
    }
    this.filterService.updateFilters(filters);
    this.ref.close();
  }
}
