import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogdescriptionComponent } from './blogdescription.component';

describe('BlogdescriptionComponent', () => {
  let component: BlogdescriptionComponent;
  let fixture: ComponentFixture<BlogdescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogdescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogdescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
