import { TestBed } from '@angular/core/testing';

import { ServerEndPointsService } from './server-end-points.service';

describe('ServerEndPointsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerEndPointsService = TestBed.get(ServerEndPointsService);
    expect(service).toBeTruthy();
  });
});
