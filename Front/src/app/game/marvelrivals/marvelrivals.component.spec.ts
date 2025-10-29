import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarvelrivalsComponent } from './marvelrivals.component';

describe('MarvelrivalsComponent', () => {
  let component: MarvelrivalsComponent;
  let fixture: ComponentFixture<MarvelrivalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarvelrivalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarvelrivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
