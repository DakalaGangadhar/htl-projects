import { NgForm,FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

export class Customer{
    id:any='';
    customerCode:string='';
    customerName:string='';
    customerAmount:number=0;
    isEdit:boolean=false;

    formCustomerGroup:FormGroup;
    constructor(){
        var _builder=new FormBuilder();
        this.formCustomerGroup=_builder.group({});
        this.formCustomerGroup.addControl("CustomerNameControl",new FormControl('',Validators.required));
        this.formCustomerGroup.addControl("CustomerCodeControl",new FormControl('',Validators.required));
        this.formCustomerGroup.addControl("CustomerAmountControl",new FormControl('',Validators.required));
}
}
