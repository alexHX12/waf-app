import { TestBed } from '@angular/core/testing';

import { ContainerInfoService } from './container-info.service';

describe('ContainerInfoService', () => {
  let service: ContainerInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContainerInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
