import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageNavbarComponent } from './landing-page-navbar.component';

describe('LandingPageNavbarComponent', () => {
  let component: LandingPageNavbarComponent;
  let fixture: ComponentFixture<LandingPageNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
