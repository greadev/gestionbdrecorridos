import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoMapa } from './demo-mapa';

describe('DemoMapa', () => {
  let component: DemoMapa;
  let fixture: ComponentFixture<DemoMapa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoMapa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoMapa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
