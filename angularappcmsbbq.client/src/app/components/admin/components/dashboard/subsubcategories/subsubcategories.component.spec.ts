import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsubcategoriesComponent } from './subsubcategories.component';

describe('SubsubcategoriesComponent', () => {
  let component: SubsubcategoriesComponent;
  let fixture: ComponentFixture<SubsubcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubsubcategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubsubcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
