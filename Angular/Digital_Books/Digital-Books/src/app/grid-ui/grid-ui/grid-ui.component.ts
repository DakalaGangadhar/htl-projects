import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-grid-ui',
  templateUrl: './grid-ui.component.html',
  styleUrls: ['./grid-ui.component.css']
})
export class GridUiComponent implements OnInit {

  constructor() { }
  gridColumns: Array<any> =new Array<any>();
  gridData: Array<any> =new Array<any>();
  @Input("readerdeletebutton") public readerdeletebutton:any;
  @Input("readereditbutton") public readereditbutton:any;
  public displayNone:any="";

  ngOnInit(): void {
    if(this.readereditbutton){
      this.displayNone="disabled-link"
    }else{
      this.displayNone=""
    }
  }
 



  @Input("grid-columns")
  set SetGridColumns(_gridColumn:Array<any>){
    this.gridColumns=_gridColumn;
  }
  @Input("grid-data")
  set SetGridData(_griddata:Array<any>){    
    this.gridData=_griddata;
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

//-------------author-----------------------
@Input("authorgrid-columns")
set SetAuthorGridColumns(_gridColumn:Array<any>){
  this.gridColumns=_gridColumn;
}
@Input("authorgrid-data")
set SetAuthorGridData(_griddata:Array<any>){    
  this.gridData=_griddata;
}
@Output("authorgrid-selected")
authoremitemitter:EventEmitter<any>=new EventEmitter<any>();

selectedAuthorGrid(_selected:any){
  
  this.emitemitter.emit(_selected);
}
@Output("authorgrid-deleted")
_authoremitemitter:EventEmitter<any>=new EventEmitter<any>();
deleteAuthorGrid(_deleted:any){
  this._emitemitter.emit(_deleted);
}

}
