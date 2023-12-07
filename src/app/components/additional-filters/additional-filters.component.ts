import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FilterForm } from 'src/app/models';

@Component({
  selector: 'app-additional-filters',
  templateUrl: './additional-filters.component.html',
  styleUrls: ['./additional-filters.component.scss']
})
export class AdditionalFiltersComponent {
  filterForm: FormGroup = new FormGroup<FilterForm>({
    //status: new FormControl(null),
    deadlineRange: new FormControl(null),
    //priority: new FormControl(null),
    //category: new FormControl(null)
  })

  constructor(private ref: DynamicDialogRef) {}

  filter() {
    this.ref.close();
  }
}
