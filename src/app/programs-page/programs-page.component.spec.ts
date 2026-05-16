import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsPageComponent } from './programs-page.component';

describe('ProgramsPageComponent', () => {
  let component: ProgramsPageComponent;
  let fixture: ComponentFixture<ProgramsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramsPageComponent]
    });
    fixture = TestBed.createComponent(ProgramsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
