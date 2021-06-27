import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LasercutComponent } from './lasercut.component';

describe('LasercutComponent', () => {
  let component: LasercutComponent;
  let fixture: ComponentFixture<LasercutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LasercutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LasercutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
