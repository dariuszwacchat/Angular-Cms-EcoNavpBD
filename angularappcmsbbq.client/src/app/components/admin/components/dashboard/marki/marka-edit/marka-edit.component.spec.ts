import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkaEditComponent } from './marka-edit.component';

describe('MarkaEditComponent', () => {
  let component: MarkaEditComponent;
  let fixture: ComponentFixture<MarkaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarkaEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
