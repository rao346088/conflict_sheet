import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDataComponent } from './action-data.component';

describe('ActionDataComponent', () => {
  let component: ActionDataComponent;
  let fixture: ComponentFixture<ActionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
