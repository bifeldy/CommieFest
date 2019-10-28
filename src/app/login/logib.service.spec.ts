import { TestBed } from '@angular/core/testing';

import { LogibService } from './logib.service';

describe('LogibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogibService = TestBed.get(LogibService);
    expect(service).toBeTruthy();
  });
});
