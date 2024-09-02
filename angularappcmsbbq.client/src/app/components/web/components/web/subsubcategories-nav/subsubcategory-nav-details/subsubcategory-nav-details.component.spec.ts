import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsubcategoryNavDetailsComponent } from './subsubcategory-nav-details.component';

describe('SubsubcategoryNavDetailsComponent', () => {
  let component: SubsubcategoryNavDetailsComponent;
  let fixture: ComponentFixture<SubsubcategoryNavDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubsubcategoryNavDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubsubcategoryNavDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
