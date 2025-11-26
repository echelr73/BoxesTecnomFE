import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsCreate } from './appointments-create';

describe('AppointmentsCreate', () => {
  let component: AppointmentsCreate;
  let fixture: ComponentFixture<AppointmentsCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentsCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
