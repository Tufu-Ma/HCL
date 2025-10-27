import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolpcComponent } from './lolpc.component';

describe('LolpcComponent', () => {
  let component: LolpcComponent;
  let fixture: ComponentFixture<LolpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LolpcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LolpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
