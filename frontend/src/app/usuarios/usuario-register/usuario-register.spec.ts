import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRegister } from './usuario-register';

describe('UsuarioRegister', () => {
  let component: UsuarioRegister;
  let fixture: ComponentFixture<UsuarioRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
