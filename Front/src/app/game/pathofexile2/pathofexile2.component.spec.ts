import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pathofexile2Component } from './pathofexile2.component';

describe('Pathofexile2Component', () => {
  let component: Pathofexile2Component;
  let fixture: ComponentFixture<Pathofexile2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Pathofexile2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pathofexile2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
