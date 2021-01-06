import { TestBed } from '@angular/core/testing';

import { JqueryService } from './jquery.service';

describe('JqueryService', () => {
  let service: JqueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JqueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
