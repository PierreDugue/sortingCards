import { TestBed } from '@angular/core/testing';

import { CardsManagerService } from './cards-manager.service';

describe('CardsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardsManagerService = TestBed.get(CardsManagerService);
    expect(service).toBeTruthy();
  });
});
