import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorantComponent } from './valorant.component';

describe('ValorantComponent', () => {
  let component: ValorantComponent;
  let fixture: ComponentFixture<ValorantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValorantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
