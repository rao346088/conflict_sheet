import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MasterLookupComponent } from './master-lookup.component';

describe('MasterLookupComponent', () => {
  let component: MasterLookupComponent;
  let fixture: ComponentFixture<MasterLookupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
