import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsorcingComponent } from './outsorcing.component';

describe('OutsorcingComponent', () => {
  let component: OutsorcingComponent;
  let fixture: ComponentFixture<OutsorcingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutsorcingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutsorcingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
