import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecorridoForm } from './recorrido-form';

describe('RecorridoForm', () => {
  let component: RecorridoForm;
  let fixture: ComponentFixture<RecorridoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecorridoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecorridoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
