import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSupplierComponent } from './emp-supplier.component';

describe('EmpSupplierComponent', () => {
  let component: EmpSupplierComponent;
  let fixture: ComponentFixture<EmpSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
