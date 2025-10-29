import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenshinImpactComponent } from './genshin-impact.component';

describe('GenshinImpactComponent', () => {
  let component: GenshinImpactComponent;
  let fixture: ComponentFixture<GenshinImpactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenshinImpactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenshinImpactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
