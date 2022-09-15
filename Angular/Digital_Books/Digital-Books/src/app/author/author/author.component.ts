import { Component, OnInit } from '@angular/core';
import { AuthorModel } from 'src/app/models/AuthorModel';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  AuthorModel: AuthorModel = new AuthorModel();
  AuthorModels: Array<AuthorModel> = new Array<AuthorModel>();
  Add() {
   
    // console.log('HI');
    // alert('HI');

    this.AuthorModels.push(this.AuthorModel);
    console.log(this.AuthorModels);
    this.AuthorModel = new AuthorModel();
  }

}
