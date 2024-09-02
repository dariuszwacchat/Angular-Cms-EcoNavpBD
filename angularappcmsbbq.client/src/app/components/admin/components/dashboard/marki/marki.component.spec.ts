import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkiComponent } from './marki.component';

describe('MarkiComponent', () => {
  let component: MarkiComponent;
  let fixture: ComponentFixture<MarkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarkiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
