import { TestBed, inject } from '@angular/core/testing';

import { BussService } from './buss.service';

describe('BussService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BussService]
    });
  });

  it('should be created', inject([BussService], (service: BussService) => {
    expect(service).toBeTruthy();
  }));
});
