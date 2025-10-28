import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HonkaistarrailComponent } from './honkaistarrail.component';

describe('HonkaistarrailComponent', () => {
  let component: HonkaistarrailComponent;
  let fixture: ComponentFixture<HonkaistarrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HonkaistarrailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HonkaistarrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
