import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

export class RegisterModel{
    Username:string='';
    Password:string='';
    /*formCustomerGroup:FormGroup;
    constructor(){
        var _builder=new FormBuilder();
        this.formCustomerGroup=_builder.group({});
        this.formCustomerGroup.addControl("UsernameControl",new FormControl('',Validators.required));
        this.formCustomerGroup.addControl("PasswordControl",new FormControl('',Validators.required));
    }*/
}