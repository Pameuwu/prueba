import { TestBed } from '@angular/core/testing';

import { ConsumirapiService } from './consumirapi.service';

describe('ConsumirapiService', () => {
  let service: ConsumirapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumirapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
