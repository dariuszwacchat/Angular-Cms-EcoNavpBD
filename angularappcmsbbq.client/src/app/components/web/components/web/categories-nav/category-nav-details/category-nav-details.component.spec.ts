import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNavDetailsComponent } from './category-nav-details.component';

describe('CategoryNavDetailsComponent', () => {
  let component: CategoryNavDetailsComponent;
  let fixture: ComponentFixture<CategoryNavDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryNavDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryNavDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
