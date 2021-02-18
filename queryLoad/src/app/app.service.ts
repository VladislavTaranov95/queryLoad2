import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Data } from './object';
  
@Injectable()
export class HttpService{

    newTodo: Data = {
      meters: "{1321}",
      chId: 2,
      interval: 1440,
      round: 4,
      tsStart: "2021-02-01",
      tsEnd: "2021-02-01",
      inGroup: false
    }
 
    //this.http.get('https://my-json-server.typicode.com/typicode/demo/posts').subscribe((user: Data[]) => this.users = user);

    // this.http.post<Data>('https://my-json-server.typicode.com/typicode/demo/posts', newTodo)
    //   .subscribe(todo => {
    //     this.data = todo;
    //     console.log(this.data);
    //   })
  
    constructor(private http: HttpClient){ }
      
    getData(){
        return this.http.post<Data>('http://91.105.201.52:8099/queryLoadProfileMode', this.newTodo);
    }
}