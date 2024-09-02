import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryNavDetailsComponent } from './subcategory-nav-details.component';

describe('SubcategoryNavDetailsComponent', () => {
  let component: SubcategoryNavDetailsComponent;
  let fixture: ComponentFixture<SubcategoryNavDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubcategoryNavDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoryNavDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
