import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesNavComponent } from './CategoriesNavComponent';

describe('CategoriesNavComponent', () => {
  let component: CategoriesNavComponent;
  let fixture: ComponentFixture<CategoriesNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
