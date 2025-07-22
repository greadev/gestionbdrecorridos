import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorMapaEditable } from './visor-mapa-editable';

describe('VisorMapaEditable', () => {
  let component: VisorMapaEditable;
  let fixture: ComponentFixture<VisorMapaEditable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisorMapaEditable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisorMapaEditable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
