import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OetComponent } from './oet.component';

describe('OetComponent', () => {
  let component: OetComponent;
  let fixture: ComponentFixture<OetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OetComponent]
    });
    fixture = TestBed.createComponent(OetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
