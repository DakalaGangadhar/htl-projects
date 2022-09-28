import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';

import { LoginServiceService } from './login-service.service';

describe('LoginServiceService', () => {
  let service: LoginServiceService;
  let http:HttpClient;
  let router:Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterModule]
    });
    service = TestBed.inject(LoginServiceService);
    http=TestBed.inject(HttpClient);
    router=TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
