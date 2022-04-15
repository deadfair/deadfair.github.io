import { TestBed } from '@angular/core/testing';

import { LandingPageConfigService } from './landing-page-config.service';

describe('LandingPageConfigService', () => {
  let service: LandingPageConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandingPageConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
