import { TestBed } from '@angular/core/testing';

import { SortTasksService } from './sort-tasks.service';

describe('SortTasksService', () => {
  let service: SortTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
