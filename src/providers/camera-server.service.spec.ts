import { TestBed, inject } from '@angular/core/testing';

import { CameraServerService } from './camera-server.service';

describe('CameraServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CameraServerService]
    });
  });

  it('should be created', inject([CameraServerService], (service: CameraServerService) => {
    expect(service).toBeTruthy();
  }));
});
