import { TestBed } from '@angular/core/testing';
import { CustomerComponent } from './customer.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CustomerComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CustomerComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'hello'`, () => {
    const fixture = TestBed.createComponent(CustomerComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('hello');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CustomerComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('hello app is running!');
  });
});
