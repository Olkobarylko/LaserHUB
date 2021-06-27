import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoftfurnitureComponent } from './loftfurniture.component';

describe('LoftfurnitureComponent', () => {
  let component: LoftfurnitureComponent;
  let fixture: ComponentFixture<LoftfurnitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoftfurnitureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoftfurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
