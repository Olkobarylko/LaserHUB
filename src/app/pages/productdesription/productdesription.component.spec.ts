import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdesriptionComponent } from './productdesription.component';

describe('ProductdesriptionComponent', () => {
  let component: ProductdesriptionComponent;
  let fixture: ComponentFixture<ProductdesriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductdesriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductdesriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
