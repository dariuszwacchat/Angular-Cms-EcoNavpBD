import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsubcategoryCreateComponent } from './subsubcategory-create.component';

describe('SubsubcategoryCreateComponent', () => {
  let component: SubsubcategoryCreateComponent;
  let fixture: ComponentFixture<SubsubcategoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubsubcategoryCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubsubcategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
