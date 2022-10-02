import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiListService {

  constructor() { }
  public api_test="";
public bookupdateUrl:any="https://localhost:44330/api/Books/bookupdate";
public createbooksUrl:any="https://localhost:44330/api/Books/create-books";
public imageURL:any="https://localhost:44330/";

public getbooksdataURL="https://localhost:44330/api/Books/getbooksdata";
public _BooksDeleteUrl="https://localhost:44330/api/Books/book-delete";
public authorcreatebookUrl:any='https://localhost:44330/api/Books/author-create-book';
public bookblockUrl:any='https://localhost:44330/api/Books/book-block';
public bookunblockUrl:any='https://localhost:44330/api/Books/book-unblock';

public _readerloginUrl:any="https://localhost:44330/api/UserLogin/login-user";
public _authorloginUrl:any="https://localhost:44330/api/Author/author-login";

public _author_registerUrl:any="https://localhost:44330/api/Author/author-register";
public _reader_registerUrl:any="https://localhost:44330/api/UserLogin/register-user";

public _GetAuthorByReaderSearch:any="https://localhost:44330/api/UserData/GetAuthorByReaderSearch";
public _BooksDelete:any="https://localhost:44330/api/UserData";
public _CreateBook:any="https://localhost:44330/api/Order/create-order";
public _GetOrderData:any="https://localhost:44330/api/Order/getorderdata";
public _CancelOrder:any="https://localhost:44330/api/Order/order-cancel";
}
