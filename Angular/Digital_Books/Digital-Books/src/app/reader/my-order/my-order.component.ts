import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  orderColumns: Array<any> =new Array<any>();
  orderData: Array<any> =new Array<any>();
  constructor() { }

  ngOnInit(): void {
  }
  @Input("order-columns")
  set SetGridColumns(_orderColumn:Array<any>){
    this.orderColumns=_orderColumn;
  }
  @Input("order-data")
  set SetGridData(_orderdata:Array<any>){    
    this.orderData=_orderdata;
    console.log("grid-data loading",this.orderData);
  }

}
