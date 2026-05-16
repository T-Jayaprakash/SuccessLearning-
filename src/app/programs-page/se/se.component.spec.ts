import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeComponent } from './se.component';

describe('SeComponent', () => {
  let component: SeComponent;
  let fixture: ComponentFixture<SeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeComponent]
    });
    fixture = TestBed.createComponent(SeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
