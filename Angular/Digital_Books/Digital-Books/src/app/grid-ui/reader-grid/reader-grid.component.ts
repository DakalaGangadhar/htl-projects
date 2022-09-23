import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reader-grid',
  templateUrl: './reader-grid.component.html',
  styleUrls: ['./reader-grid.component.css']
})
export class ReaderGridComponent implements OnInit {

  constructor() { }
  
  public imageURL:any="https://localhost:44330/";
  gridColumns: Array<any> =new Array<any>();
  gridData: Array<any> =new Array<any>();
  @Input("readerdeletebutton") public readerdeletebutton:any;
  @Input("readereditbutton") public readereditbutton:any;
  public displayNone:any="";
  public imagePath:any

  ngOnInit(): void {
    if(this.readereditbutton){
      this.displayNone="disabled-link"
    }else{
      this.displayNone=""
    }
  }
  getImage(input:any){
    console.log(input)
      }



  @Input("grid-columns")
  set SetGridColumns(_gridColumn:Array<any>){
    this.gridColumns=_gridColumn;
  }
  @Input("grid-data")
  set SetGridData(_griddata:Array<any>){    
    this.gridData=_griddata;
    console.log("grid-data loading",this.gridData);
  }
  @Output("grid-selected")
  emitemitter:EventEmitter<any>=new EventEmitter<any>();

  selectedGrid(_selected:any){
    
    this.emitemitter.emit(_selected);
  }
  @Output("grid-deleted")
  _emitemitter:EventEmitter<any>=new EventEmitter<any>();
  deleteGrid(_deleted:any){
    this._emitemitter.emit(_deleted);
  }
  buyABook(){
    
  }
 

}
