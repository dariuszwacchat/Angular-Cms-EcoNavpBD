import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsubcategoryDeleteComponent } from './subsubcategory-delete.component';

describe('SubsubcategoryDeleteComponent', () => {
  let component: SubsubcategoryDeleteComponent;
  let fixture: ComponentFixture<SubsubcategoryDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubsubcategoryDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubsubcategoryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
