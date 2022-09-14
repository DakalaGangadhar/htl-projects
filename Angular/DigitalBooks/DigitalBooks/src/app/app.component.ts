import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DigitalBooks';

  public isauthorDisabled=false;
  public isreaderDisabled=false;
  
  getAuthor(){

    console.log("author");
    this.isauthorDisabled=true;
    this.isreaderDisabled=false;
  }
  getReader(){
    console.log("reader");
    this.isauthorDisabled=false;
    this.isreaderDisabled=true;
  }
}
