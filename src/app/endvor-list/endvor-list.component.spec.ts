import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EndvorListComponent } from './endvor-list.component';

describe('EndvorListComponent', () => {
  let component: EndvorListComponent;
  let fixture: ComponentFixture<EndvorListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EndvorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndvorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
