import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoValidacaoComponent } from './codigo-validacao.component';

describe('CodigoValidacaoComponent', () => {
  let component: CodigoValidacaoComponent;
  let fixture: ComponentFixture<CodigoValidacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigoValidacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoValidacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
