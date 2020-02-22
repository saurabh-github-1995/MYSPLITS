import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DASHBOARDComponent } from './dashboard.component';

describe('DASHBOARDComponent', () => {
  let component: DASHBOARDComponent;
  let fixture: ComponentFixture<DASHBOARDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DASHBOARDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DASHBOARDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
