import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorecreatorsComponent } from './storecreators.component';

describe('StorecreatorsComponent', () => {
  let component: StorecreatorsComponent;
  let fixture: ComponentFixture<StorecreatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorecreatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorecreatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
