import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejestratorLogowaniaComponent } from './rejestrator-logowania.component';

describe('RejestratorLogowaniaComponent', () => {
  let component: RejestratorLogowaniaComponent;
  let fixture: ComponentFixture<RejestratorLogowaniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RejestratorLogowaniaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejestratorLogowaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
