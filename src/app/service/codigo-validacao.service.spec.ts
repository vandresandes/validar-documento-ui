import { TestBed } from '@angular/core/testing';

import { CodigoValidacaoService } from './codigo-validacao.service';

describe('CodigoValidacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodigoValidacaoService = TestBed.get(CodigoValidacaoService);
    expect(service).toBeTruthy();
  });
});
