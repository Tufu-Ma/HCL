import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonuniteComponent } from './pokemonunite.component';

describe('PokemonuniteComponent', () => {
  let component: PokemonuniteComponent;
  let fixture: ComponentFixture<PokemonuniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonuniteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonuniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
