import { TestBed } from '@angular/core/testing';

import { SnakeConfigService } from './snake-config.service';

describe('SnakeConfigService', () => {
  let service: SnakeConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnakeConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
