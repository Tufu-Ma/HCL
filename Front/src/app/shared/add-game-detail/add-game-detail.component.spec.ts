import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGameDetailComponent } from './add-game-detail.component';

describe('AddGameDetailComponent', () => {
  let component: AddGameDetailComponent;
  let fixture: ComponentFixture<AddGameDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddGameDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
