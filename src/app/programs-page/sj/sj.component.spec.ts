import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SjComponent } from './sj.component';

describe('SjComponent', () => {
  let component: SjComponent;
  let fixture: ComponentFixture<SjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SjComponent]
    });
    fixture = TestBed.createComponent(SjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
