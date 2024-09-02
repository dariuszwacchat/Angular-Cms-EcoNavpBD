import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriesNavComponent } from './subcategories-nav.component';

describe('SubcategoriesNavComponent', () => {
  let component: SubcategoriesNavComponent;
  let fixture: ComponentFixture<SubcategoriesNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubcategoriesNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoriesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
