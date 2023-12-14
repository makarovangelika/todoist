import { Component, EventEmitter, Output } from '@angular/core';
import { PRIORITY_LABELS, STATUS_LABELS } from 'src/app/constants';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter-chips',
  templateUrl: './filter-chips.component.html',
  styleUrls: ['./filter-chips.component.scss']
})
export class FilterChipsComponent {
  @Output() readonly filterChipClicked = new EventEmitter();
  statusLabels = STATUS_LABELS;
  priorityLabels = PRIORITY_LABELS;

  constructor(public filterService: FilterService) {}

  openAdditionalFilters() {
    this.filterChipClicked.emit();
  }
}
