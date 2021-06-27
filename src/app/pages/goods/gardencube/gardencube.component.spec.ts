import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardencubeComponent } from './gardencube.component';

describe('GardencubeComponent', () => {
  let component: GardencubeComponent;
  let fixture: ComponentFixture<GardencubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardencubeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GardencubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
