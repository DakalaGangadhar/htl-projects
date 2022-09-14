import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hello';
  lalvalue:any;
  public windows=window.location.href;
  public textclass="lblText";
  public name:any;
  eventSubmit(val:any){

  }
}
