import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppgroupsComponent } from './appgroups.component';

describe('AppgroupsComponent', () => {
  let component: AppgroupsComponent;
  let fixture: ComponentFixture<AppgroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppgroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
