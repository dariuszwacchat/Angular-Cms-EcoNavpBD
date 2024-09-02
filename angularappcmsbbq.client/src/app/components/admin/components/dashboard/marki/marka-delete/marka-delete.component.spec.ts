import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkaDeleteComponent } from './marka-delete.component';

describe('MarkaDeleteComponent', () => {
  let component: MarkaDeleteComponent;
  let fixture: ComponentFixture<MarkaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarkaDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
