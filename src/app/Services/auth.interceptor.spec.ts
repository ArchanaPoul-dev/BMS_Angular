import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let service: AuthInterceptor;
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports:[HttpClientTestingModule],
    providers: [AuthInterceptor]
  });
  service = TestBed.inject(AuthInterceptor);
});
  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
