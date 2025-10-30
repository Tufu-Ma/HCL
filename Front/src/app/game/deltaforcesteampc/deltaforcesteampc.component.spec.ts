import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeltaforcesteampcComponent } from './deltaforcesteampc.component';

describe('DeltaforcesteampcComponent', () => {
  let component: DeltaforcesteampcComponent;
  let fixture: ComponentFixture<DeltaforcesteampcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeltaforcesteampcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeltaforcesteampcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
