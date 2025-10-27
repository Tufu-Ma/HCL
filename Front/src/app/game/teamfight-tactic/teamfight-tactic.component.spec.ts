import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamfightTacticComponent } from './teamfight-tactic.component';

describe('TeamfightTacticComponent', () => {
  let component: TeamfightTacticComponent;
  let fixture: ComponentFixture<TeamfightTacticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamfightTacticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamfightTacticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
