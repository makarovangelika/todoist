import { Component, Input, WritableSignal } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FilterService } from 'src/app/services/filter.service';
import { AdditionalFiltersComponent } from '../additional-filters/additional-filters.component';
import { PRIORITY_LABELS, STATUS_LABELS } from 'src/app/constants';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  ref: DynamicDialogRef | undefined;
  statusLabels = STATUS_LABELS;
  priorityLabels = PRIORITY_LABELS;

  constructor(public filterService: FilterService,
              private dialogService: DialogService) {}

  openAdditionalFilters() {
    this.ref = this.dialogService.open(AdditionalFiltersComponent, {
      dismissableMask: true,
      modal: true,
      keepInViewport: true,
      header: "Фильтры"
    })
  }
}
