import { TestBed } from '@angular/core/testing';

import { CfcStateServiceService } from './cfc-state-service.service';

describe('CfcStateServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CfcStateServiceService = TestBed.get(CfcStateServiceService);
    expect(service).toBeTruthy();
  });
});
