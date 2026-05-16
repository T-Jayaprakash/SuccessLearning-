import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetComponent } from './det.component';

describe('DetComponent', () => {
  let component: DetComponent;
  let fixture: ComponentFixture<DetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetComponent]
    });
    fixture = TestBed.createComponent(DetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
