import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejestratorLogowaniaDeleteComponent } from './rejestrator-logowania-delete.component';

describe('RejestratorLogowaniaDeleteComponent', () => {
  let component: RejestratorLogowaniaDeleteComponent;
  let fixture: ComponentFixture<RejestratorLogowaniaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RejestratorLogowaniaDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejestratorLogowaniaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
