import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejestratorLogowaniaEditComponent } from './rejestrator-logowania-edit.component';

describe('RejestratorLogowaniaEditComponent', () => {
  let component: RejestratorLogowaniaEditComponent;
  let fixture: ComponentFixture<RejestratorLogowaniaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RejestratorLogowaniaEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejestratorLogowaniaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
