import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReaderServiceService {
  public _token:any='';
  _GetAuthorByReaderSearch="https://localhost:44330/api/UserData/GetAuthorByReaderSearch/";
  _BooksDelete="https://localhost:44330/api/UserData";
  _CreateBook="https://localhost:44330/api/Order/create-order";
  _GetOrderData="https://localhost:44330/api/Order/getorderdata";
  _CancelOrder="https://localhost:44330/api/Order/order-cancel";
  constructor(private http:HttpClient) { }


  GetAuthorByReaderSearch(_readerModel:any){
    _readerModel.category;
    _readerModel.author;
    _readerModel.publisher;
    _readerModel.price;
   
    
    return this.http.get<any>(this._GetAuthorByReaderSearch+'?category='+ _readerModel.category +'&author='+ _readerModel.author+'&publisher='+_readerModel.publisher+'&price='+ _readerModel.price);
   // return this.http.get<any>(this._GetAuthorByReaderSearch+'?title='+ _readerModel.title);
  }
  DeleteBooksData(id_data:any){
    return this.http.delete(this._BooksDelete+'?authorid='+id_data);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  logginIn(){
    return !!localStorage.getItem('token');
  }
  CreateBookOrder(createorder:any){

    return this.http.post(this._CreateBook,createorder)
      .pipe(map((data: any) => {     
        return data;
      })
      ,
       catchError((error) => {    // handle error
         
          if (error.status == 404) {
            //Handle Response code here
          }
          return throwError(error);
        })
      );
  }
  myOrder(readermail:any){

    return this.http.get(this._GetOrderData+'?readerEmailid='+readermail)
      .pipe(map((oderdata: any) => {     
        return oderdata;
      })
      ,
       catchError((error) => {    // handle error
         
          if (error.status == 404) {
            //Handle Response code here
          }
          return throwError(error);
        })
      );
  }
  cancelOrder(orderid:any){

    return this.http.put(this._CancelOrder+'?orderBookId='+orderid,'')
      .pipe(map((canceloder: any) => {     
        return canceloder;
      })
      ,
       catchError((error) => {    // handle error
         
          if (error.status == 404) {
            //Handle Response code here
          }
          return throwError(error);
        })
      );
  }
}
