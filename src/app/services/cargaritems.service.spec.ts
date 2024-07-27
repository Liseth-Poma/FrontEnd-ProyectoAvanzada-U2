import { TestBed } from '@angular/core/testing';

import { CargaritemsService } from './cargaritems.service';

describe('CargaritemsService', () => {
  let service: CargaritemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaritemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
