import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lol2xkoComponent } from './lol2xko.component';

describe('Lol2xkoComponent', () => {
  let component: Lol2xkoComponent;
  let fixture: ComponentFixture<Lol2xkoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Lol2xkoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lol2xkoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
