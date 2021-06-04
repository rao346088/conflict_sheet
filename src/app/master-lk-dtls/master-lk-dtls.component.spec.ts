import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MasterLkDtlsComponent } from './master-lk-dtls.component';

describe('MasterLkDtlsComponent', () => {
  let component: MasterLkDtlsComponent;
  let fixture: ComponentFixture<MasterLkDtlsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterLkDtlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLkDtlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
