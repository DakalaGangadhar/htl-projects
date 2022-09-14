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

  ngOnInit(): void {
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

}
