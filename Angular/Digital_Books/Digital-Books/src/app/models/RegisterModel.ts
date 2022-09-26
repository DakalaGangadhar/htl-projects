import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

export class RegisterModel{
    Username:string='';
    Password:string='';
   public formRegisterGroup:FormGroup;
    constructor(){
    var _builder=new FormBuilder();
    this.formRegisterGroup=_builder.group({
        UsernameControl:new FormControl('',Validators.compose([Validators.required,Validators.email])),
        UserPasswordControl:new FormControl('',Validators.compose([Validators.required,Validators.pattern("[0-9]+")]))
    });
   /*.formRegisterGroup.addControl("UsernameControl",new FormControl('',Validators.compose([Validators.required,Validators.email])));
    this.formRegisterGroup.addControl("UserPasswordControl",new FormControl('',Validators.required));

    var validationUsername=[];
        validationUsername.push(Validators.required);
        validationUsername.push(Validators.email);
        this.formRegisterGroup.addControl("UsernameControl",new FormControl('',Validators.compose(validationUsername)));

        var validationPassword=[];
        validationPassword.push(Validators.required);
        validationPassword.push(Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$"));
        this.formRegisterGroup.addControl("UserPasswordControl",new FormControl('',Validators.compose(validationPassword)));  */
    }
    get user(){
       return this.formRegisterGroup.controls;
    }
}