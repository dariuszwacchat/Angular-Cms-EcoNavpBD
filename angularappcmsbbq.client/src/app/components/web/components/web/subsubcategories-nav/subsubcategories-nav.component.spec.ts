import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsubcategoriesNavComponent } from './subsubcategories-nav.component';

describe('SubsubcategoriesNavComponent', () => {
  let component: SubsubcategoriesNavComponent;
  let fixture: ComponentFixture<SubsubcategoriesNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubsubcategoriesNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubsubcategoriesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
