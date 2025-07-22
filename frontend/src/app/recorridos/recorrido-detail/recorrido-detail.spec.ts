import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecorridoDetail } from './recorrido-detail';

describe('RecorridoDetail', () => {
  let component: RecorridoDetail;
  let fixture: ComponentFixture<RecorridoDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecorridoDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecorridoDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
