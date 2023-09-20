import { TestBed } from '@angular/core/testing';

import { AuthiService } from './authi.service';

describe('AuthiService', () => {
  let service: AuthiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
