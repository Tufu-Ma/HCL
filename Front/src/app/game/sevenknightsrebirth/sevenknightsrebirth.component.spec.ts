import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SevenknightsrebirthComponent } from './sevenknightsrebirth.component';

describe('SevenknightsrebirthComponent', () => {
  let component: SevenknightsrebirthComponent;
  let fixture: ComponentFixture<SevenknightsrebirthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SevenknightsrebirthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SevenknightsrebirthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
