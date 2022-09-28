import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { LoginServiceService } from 'src/app/services/login-service.service';

import { MyOrderComponent } from './my-order.component';

describe('MyOrderComponent', () => {
  let component: MyOrderComponent;
  let fixture: ComponentFixture<MyOrderComponent>;

  beforeEach(async () => {
    let serviceLogin:LoginServiceService;
    let jwthelperService:JwtHelperService;
    await TestBed.configureTestingModule({
      declarations: [ MyOrderComponent ],
      imports:[HttpClientTestingModule],
      providers:[{provide:JWT_OPTIONS,useValue:JWT_OPTIONS},JwtHelperService]
    })
    .compileComponents();
    serviceLogin=TestBed.inject(LoginServiceService);
    fixture = TestBed.createComponent(MyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
