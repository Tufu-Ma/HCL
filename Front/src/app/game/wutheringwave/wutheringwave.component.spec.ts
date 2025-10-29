import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WutheringwaveComponent } from './wutheringwave.component';

describe('WutheringwaveComponent', () => {
  let component: WutheringwaveComponent;
  let fixture: ComponentFixture<WutheringwaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WutheringwaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WutheringwaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
