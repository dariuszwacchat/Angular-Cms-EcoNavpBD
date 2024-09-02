import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsubcategoryEditComponent } from './subsubcategory-edit.component';

describe('SubsubcategoryEditComponent', () => {
  let component: SubsubcategoryEditComponent;
  let fixture: ComponentFixture<SubsubcategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubsubcategoryEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubsubcategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
