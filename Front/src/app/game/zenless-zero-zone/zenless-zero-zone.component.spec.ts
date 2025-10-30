import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenlessZeroZoneComponent } from './zenless-zero-zone.component';

describe('ZenlessZeroZoneComponent', () => {
  let component: ZenlessZeroZoneComponent;
  let fixture: ComponentFixture<ZenlessZeroZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZenlessZeroZoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZenlessZeroZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
