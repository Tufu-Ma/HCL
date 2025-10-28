import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildriftComponent } from './wildrift.component';

describe('WildriftComponent', () => {
  let component: WildriftComponent;
  let fixture: ComponentFixture<WildriftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WildriftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WildriftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
