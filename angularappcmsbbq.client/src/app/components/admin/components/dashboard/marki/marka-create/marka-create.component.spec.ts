import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkaCreateComponent } from './marka-create.component';

describe('MarkaCreateComponent', () => {
  let component: MarkaCreateComponent;
  let fixture: ComponentFixture<MarkaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarkaCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
