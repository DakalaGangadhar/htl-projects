import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

export class RegisterModel{
    Username:string='';
    Password:string='';
    public formRegisterGroup:FormGroup;
    constructor(){
    var _builder=new FormBuilder();
    this.formRegisterGroup=_builder.group({});
    this.formRegisterGroup.addControl("UsernameControl",new FormControl('',Validators.required));
    this.formRegisterGroup.addControl("UserPasswordControl",new FormControl('',Validators.required));

    var validationUsername=[];
        validationUsername.push(Validators.required);
        validationUsername.push(Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"));
        this.formRegisterGroup.addControl("UsernameControl",new FormControl('',Validators.compose(validationUsername)));

        var validationcollection=[];
        validationcollection.push(Validators.required);
        validationcollection.push(Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$"));
        this.formRegisterGroup.addControl("UserPasswordControl",new FormControl('',Validators.compose(validationcollection)));    
    }
}