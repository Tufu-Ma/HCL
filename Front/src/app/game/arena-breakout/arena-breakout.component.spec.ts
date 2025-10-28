import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenaBreakoutComponent } from './arena-breakout.component';

describe('ArenaBreakoutComponent', () => {
  let component: ArenaBreakoutComponent;
  let fixture: ComponentFixture<ArenaBreakoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArenaBreakoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArenaBreakoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
