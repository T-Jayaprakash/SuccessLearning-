import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeetComponent } from './neet.component';

describe('NeetComponent', () => {
  let component: NeetComponent;
  let fixture: ComponentFixture<NeetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NeetComponent]
    });
    fixture = TestBed.createComponent(NeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
