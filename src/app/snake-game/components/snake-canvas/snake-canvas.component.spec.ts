import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeCanvasComponent } from './snake-canvas.component';

describe('SnakeCanvasComponent', () => {
  let component: SnakeCanvasComponent;
  let fixture: ComponentFixture<SnakeCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnakeCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
