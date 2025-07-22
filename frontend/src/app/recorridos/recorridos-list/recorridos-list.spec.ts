import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecorridosList } from './recorridos-list';

describe('RecorridosList', () => {
  let component: RecorridosList;
  let fixture: ComponentFixture<RecorridosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecorridosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecorridosList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
