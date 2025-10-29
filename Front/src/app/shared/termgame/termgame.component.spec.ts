import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermgameComponent } from './termgame.component';

describe('TermgameComponent', () => {
  let component: TermgameComponent;
  let fixture: ComponentFixture<TermgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermgameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
