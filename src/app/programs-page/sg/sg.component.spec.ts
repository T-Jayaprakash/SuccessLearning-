import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgComponent } from './sg.component';

describe('SgComponent', () => {
  let component: SgComponent;
  let fixture: ComponentFixture<SgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SgComponent]
    });
    fixture = TestBed.createComponent(SgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
