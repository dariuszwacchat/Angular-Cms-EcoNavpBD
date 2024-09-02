import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryDeleteComponent } from './subcategory-delete.component';

describe('SubcategoryDeleteComponent', () => {
  let component: SubcategoryDeleteComponent;
  let fixture: ComponentFixture<SubcategoryDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubcategoryDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
