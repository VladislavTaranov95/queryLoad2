import { HttpClient } from "@angular/common/http";
import { Data } from "./object";
import { Injectable } from '@angular/core';
import { throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatSelectChange } from "@angular/material/select";

@Injectable({
    providedIn: 'root',
})

export class DataService{

    inputText: string;
    selectedChId: number;
    selectedInterval: number;
    selectedRound: number;
    dateStart: string;
    dateEnd: string;
    inGroup: boolean;

    logString = 
    `{
         "in_meters" : "{1321}", 
         "in_ch_id" : 2,  
         "in_interval" : 1440,   
         "in_round" : 4,    
         "in_ts_start" : "2021-02-01",   
         "in_ts_end" : "2021-02-01",    
         "in_group" : false    
     }`;

    constructor(private http: HttpClient) {}
      
    getData() {       
        console.log(this.logString);
        return this.http.get("/queryLoadProfileMode");
    }

    addData(){    
        return this.http.post<String>("/queryLoadProfileMode", this.logString);
    }
}