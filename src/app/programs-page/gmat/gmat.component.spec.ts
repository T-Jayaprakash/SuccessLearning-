import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmatComponent } from './gmat.component';

describe('GmatComponent', () => {
  let component: GmatComponent;
  let fixture: ComponentFixture<GmatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GmatComponent]
    });
    fixture = TestBed.createComponent(GmatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
