import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestBandComponent } from './request-band.component';

describe('RequestBandComponent', () => {
  let component: RequestBandComponent;
  let fixture: ComponentFixture<RequestBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestBandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
