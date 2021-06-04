import { TestBed } from '@angular/core/testing';

import { ActionDataService } from './action-data.service';

describe('ActionDataService', () => {
  let service: ActionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
